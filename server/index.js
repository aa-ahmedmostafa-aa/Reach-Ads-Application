import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import cron from 'node-cron';
import nodemailer from'nodemailer';
import adsRoutes from "./modules/Advertisement/Routes/ads.js";
import categoryRoutes from "./modules/Category/Routes/category.js";
import TagsRoutes from "./modules/Tags/Routes/tags.js";
import UserRoutes from "./modules/User/routes/authRoutes.js";
import passport from './common/config/passport.js';
import errorHandler from './common/middlewares/errorHandler.js';
import User from './modules/User/Models/User.js';

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

app.use("/ads", adsRoutes);
app.use("/category", categoryRoutes);
app.use("/Tags", TagsRoutes);
app.use("/User", UserRoutes);

/*Cron Job Start*/
cron.schedule('0 8 * * * *', async () => {
    const result = await User.find({roleId: '2'}, {email:1})
    const users = result.map((user) => user.email)
    console.log(users)
    // e-mail message options
    let mailOptions = {
        from: 'ahmed.moustafa9663@gmail.com',
        to: users,
        subject: 'Advertisement Reminder',
        text: 'A REMINDER FROM REACH APP'
    }

// e-mail transport configuration
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: 'ahmed.moustafa9663@gmail.com',
        pass: '**********'
        }
    });
    if(users.length == 0){
        console.log('No users')
        return
    }
// Send e-mail
transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
  });
}, {
    scheduled: true,
});
/*Cron job end */


app.use(passport.initialize());

const CONNECTION_URL =
"mongodb+srv://AhmedMostafa:Ahmed1234@cluster0.jwl0u.mongodb.net/<dbname>?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;
app.use(errorHandler)
mongoose
.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() =>
app.listen(PORT, () => console.log(`Server is running on port : ${PORT}`))
)
.catch((error) => console.log(error.message));

mongoose.set("useFindAndModify", false);
