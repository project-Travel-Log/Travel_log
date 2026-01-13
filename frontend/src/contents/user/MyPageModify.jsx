import React, { useEffect, useState } from 'react'
import "./user.css"
import { mypageDelete, mypageMd, mypageUpdate } from '../../API/user'
import { Link, useNavigate } from 'react-router-dom'


const MyPageModify = () => {
    const [user, setUser] = useState({
        userid: "",
        username: "",
        email: "",
        phone: "",
        user_img: "",
    })

    const [imageFile, setImageFile] = useState(null)
    const [preview, setPreview] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        mypageMd()
            .then(res => {
                setUser(res.data)
            })
            .catch(err => console.error(err))
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setUser(prev => ({ ...prev, [name]: value }))
    }

    const imageChange = (e) => {
        const file = e.target.files[0]
        if (!file) return
        setImageFile(file)
        setPreview(URL.createObjectURL(file))
    }

    const cancel = () => {
        const ok = window.confirm("정말 취소 하시겠습니까?\n 작성한 내용은 저장되지 않습니다.")

        if (ok) {
            navigate("/")
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("username", user.username)
        formData.append("email", user.email)
        formData.append("phone", user.phone)

        if (imageFile) {
            formData.append("profile_image", imageFile)
        }

        try {
            await mypageUpdate(formData)
            alert("회원 정보가 수정되었습니다.")
            navigate("/")
        } catch (err) {
            alert(err.response?.data?.message || "수정 실패")
        }
    }

    const handleDelete = async () => {
        const ok = window.confirm("정말 탈퇴하시겠습니까?\n작성한 글도 모두 삭제됩니다.")
        if (!ok) return

        try {
            await mypageDelete()
            localStorage.removeItem("accessToken")
            alert("회원 탈퇴 완료")
            navigate("/login")
        } catch (err) {
            alert("탈퇴 실패")
        }
    }

    const clearOnFocus = (field) => {
        setUser(prev => ({
            ...prev,
            [field]: ""
        }))
    }


    return (
        <>
            <div className="mypage-modify-profile">
                <label className="mypage-modify-profile-inner">
                    <img src={preview ? preview : `http://localhost:5000/static/${user.user_img}`} className="mypage-modify-profile-img"></img>
                    <label className="mypage-profile-text">
                        프로필 이미지 변경
                        <input type='file' accept='image/*' onChange={imageChange} hidden />
                    </label>
                </label>
            </div>

            <div className="mypage-modify-wrap">
                <form className="mypage-modify-form">
                    <input type="text" name="username" value={user.username} onFocus={() => clearOnFocus("username")} onChange={handleChange} />
                    <input type="email" name="email" value={user.email} onFocus={() => clearOnFocus("email")} onChange={handleChange} />
                    <input type="text" name="phone" value={user.phone} onFocus={() => clearOnFocus("phone")} onChange={handleChange} />

                    <div className="mypage-btn-group">
                        <button type="submit" onClick={handleSubmit}>수정</button>
                        <button type="button" onClick={cancel}>취소</button>
                        <button type="submit" onClick={handleDelete}>삭제</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default MyPageModify