import bcrypt from "bcryptjs";
import User from "../models/user.model";
import jwt from "jsonwebtoken";


export const signup = async (req, res) => {
    try {
        // lấy dữ liệu từ client
        const { username, email, password } = req.body;

        // kiểm tra xem email có tồn tại không?
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({
                message: "Email đã tồn tại"
            });
        }

        // mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);

        // lưu vào cơ sở dữ liệu
        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });

        user.password = undefined;

        // trả về thông báo (giống style bạn đang dùng)
        return res.json(user);

    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};



export const signin = async (req, res) => {
    try {
        // lấy dữ liệu từ client gửi lên
        const { email, password } = req.body;

        // tìm user dựa trên email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Email không tồn tại!"
            });
        }

        // so sánh mật khẩu
        const matchPassword = await bcrypt.compare(password, user.password);
        if (!matchPassword) {
            return res.status(400).json({
                message: "Mật khẩu không đúng!"
            });
        }

        // tạo token
        const token = jwt.sign(
            { email: user.email, role: user.role },
            "123456",
            { expiresIn: "1h" }
        );

        user.password = undefined;

        return res.json({
            data: user,
            token
        });

    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};
