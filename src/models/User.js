import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const saltRounds = 10

const userSchema = new mongoose.Schema({
    userId: {
        type: String, required: true, unique: true, //trim:true,
        minLength: 4, maxLength: 12
    },
    userPw: {
        type: String, required: true, //trim:true,
        minLength: 4, maxLength: 12
    },
    userName: {
        type: String, required: true, //trim:true,
        minLength: 2, maxLength: 12
    },
    userTel: {
        type: Number, required: true, //trim:true,
        minLength: 11, maxLength: 11
    }, 
    userAddress: {
        type: String, required: true,
        minLength: 11, maxLength: 30
    },
    userDetailAddress: {
        type: String, required: true,
        minLength: 3, maxLength: 20
    },
    userBirth: {
        type: Number, required: true, //trim:true,
        minLength: 8, maxLength: 8
    },
    userGrade: {
        type: String, required: true, default: "white"
    },
    userPoint: {
        type: Number, required: true, default: 0
    },
});

// Bcrypt로 비밀번호 암호화 하기
userSchema.pre('save', function (next) {
    var user = this;
    // salt를 이용해서 비밀번호 암호화한 후 보내줌
    if (user.isModified('userPw')) { //비밀번호 수정 시에만 실행되도록
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err)
                return next(err)
            bcrypt.hash(user.userPw, salt, function (err, hash) {
                if (err) return next(err)
                user.userPw = hash
                next()
            })
        })
    } else {
        next() // 그 외에는 그냥 내보냄
    }
})

userSchema.statics.modifyPw = async function (pw) {
    var user = pw;
    // if (user.isModified('userPw')) { //비밀번호 수정 시에만 실행되도록
    user = await bcrypt.hash(user, saltRounds);
    // bcrypt.genSalt(saltRounds, function (err, salt, user) {
    //     if (err)
    //         bcrypt.hash(user, salt, function (err, hash) {
    //             console.log("유저 : ", user);
    //             if (err) {
    //                 console.log("에러 : ", err);
    //                 throw err;
    //             }
    //         user = hash;
    //         return err;
    //     })
    //     return user; 
    // })
    console.log("USER: ", user);
    return user
    // } 
}

// 입력된 비밀번호와 데이터베이스에 있는 암호화된 비밀번호가 같은지 비교
// => 평문을 암호화해서 비교
userSchema.methods.comparePassword = function (plainPassword, cb) {
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        if (err)
            return cb(err)
        cb(null, isMatch) // true
    })
}

const User = mongoose.model("User", userSchema);
export default User;