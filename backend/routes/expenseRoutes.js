import express from 'express';
import Expense from '../models/Expense.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All expense routes require authentication
router.use(protect);

// @route   GET /api/expenses
// @desc    Get all expenses for current user with optional search, category, and date range filters
// @access  Private
router.get('/', async (req, res) => {
  try {
    const { category, search, startDate, endDate } = req.query;
    const filter = { user: req.user._id };

    // Category filter
    if (category && category !== 'All') {
      filter.category = category;
    }

    // Name / keyword search (case-insensitive regex)
    if (search && search.trim()) {
      filter.name = { $regex: search.trim(), $options: 'i' };
    }

    // Date range filter
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) {
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        filter.date.$gte = start;
      }
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        filter.date.$lte = end;
      }
    }

    // Sort by date descending, then creation date descending
    const expenses = await Expense.find(filter).sort({ date: -1, createdAt: -1 });

    // Transform _id to id for seamless frontend compatibility
    const formattedExpenses = expenses.map((exp) => ({
      id: exp._id,
      name: exp.name,
      amount: exp.amount,
      category: exp.category,
      date: exp.date,
      createdAt: exp.createdAt,
    }));

    res.json({
      success: true,
      count: formattedExpenses.length,
      data: formattedExpenses,
    });
  } catch (error) {
    console.error('Fetch expenses error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve expenses',
    });
  }
});

// @route   POST /api/expenses
// @desc    Create a new expense
// @access  Private
router.post('/', async (req, res) => {
  try {
    const { name, amount, category, date } = req.body;

    if (!name || amount === undefined || amount === null) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name and amount',
      });
    }

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Amount must be a positive number',
      });
    }

    const expense = await Expense.create({
      user: req.user._id,
      name,
      amount: numericAmount,
      category: category || 'Food',
      date: date ? new Date(date) : new Date(),
    });

    res.status(201).json({
      success: true,
      data: {
        id: expense._id,
        name: expense.name,
        amount: expense.amount,
        category: expense.category,
        date: expense.date,
        createdAt: expense.createdAt,
      },
    });
  } catch (error) {
    console.error('Create expense error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create expense',
    });
  }
});

// @route   PUT /api/expenses/:id
// @desc    Update an expense
// @access  Private
router.put('/:id', async (req, res) => {
  try {
    let expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: 'Expense not found',
      });
    }

    // Ensure the expense belongs to the user
    if (expense.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this expense',
      });
    }

    const { name, amount, category, date } = req.body;
    if (name) expense.name = name;
    if (amount !== undefined) expense.amount = parseFloat(amount);
    if (category) expense.category = category;
    if (date) expense.date = new Date(date);

    const updated = await expense.save();

    res.json({
      success: true,
      data: {
        id: updated._id,
        name: updated.name,
        amount: updated.amount,
        category: updated.category,
        date: updated.date,
        createdAt: updated.createdAt,
      },
    });
  } catch (error) {
    console.error('Update expense error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update expense',
    });
  }
});

// @route   DELETE /api/expenses/:id
// @desc    Delete an expense
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: 'Expense not found',
      });
    }

    // Ensure expense belongs to current user
    if (expense.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this expense',
      });
    }

    await expense.deleteOne();

    res.json({
      success: true,
      message: 'Expense removed successfully',
      id: req.params.id,
    });
  } catch (error) {
    console.error('Delete expense error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete expense',
    });
  }
});

export default router;
