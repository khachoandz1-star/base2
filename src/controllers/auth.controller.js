import User from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({
                message: "email đã tồn tại"
            });
        }

        // ✅ sửa ở đây
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });

        user.password = undefined;

        return res.json(user);

    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};


export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "email không tồn tại"
            });
        }

        const matchPassword = await bcrypt.compare(password, user.password);
        if (!matchPassword) {
            return res.status(400).json({
                message: "Mật khẩu không đúng"
            });
        }

        // ✅ sửa ở đây
        const token = jwt.sign(
            { email: user.email, role: user.role },
            "123456",
            { expiresIn: "1h" }
        );

        user.password = undefined;

        res.json({
            data: user,
            token
        });

    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};
