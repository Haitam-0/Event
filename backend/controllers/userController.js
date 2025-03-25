const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// @desc Register user
// @route POST /api/users/register
// @access Public
const registerUser = asyncHandler(async (req, res, next) => {
    const { username, email, password, role = "user" } = req.body; // Default role is "user"

    if (!username || !email || !password) {
        res.status(400);
        return next(new Error("Tous les champs sont obligatoires"));
    }

    // Check if email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        return next(new Error("L'email est déjà utilisé"));
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Mot de passe haché:", hashedPassword);

    // Create new user
    const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
        role // Add role to new user
    });

    if (newUser) {
        res.status(201).json({
            _id: newUser.id,
            username: newUser.username,
            email: newUser.email,
            role: newUser.role // Send role in the response
        });
    } else {
        res.status(400);
        return next(new Error("Échec de la création de l'utilisateur"));
    }
});

// @desc Login user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        return next(new Error("Veuillez fournir un email et un mot de passe"));
    }

    // Find user by email
    const user = await User.findOne({ email });

    // Check password
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign(
            {
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.role // Include role in the JWT payload
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            message: "Connexion réussie",
            accessToken,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role // Send role in the response
            }
        });
    } else {
        res.status(401);
        return next(new Error("Email ou mot de passe incorrect"));
    }
});

// @desc Get current user
// @route GET /api/users/current
// @access Private
const currentUser = asyncHandler(async (req, res) => {
    res.json({ message: "Informations de l'utilisateur actuel", user: req.user });
});

module.exports = { registerUser, loginUser, currentUser };
