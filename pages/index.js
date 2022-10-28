import React, { useState } from "react"
import axios from 'axios'

export const getStaticProps = async () => {
  const res = await fetch('http://localhost:5000/user');
  const data = await res.json();
  return {
    props: { users: data }
  }
}



export default function Home({ users }) {
  const [user, setUser] = useState(users);
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [phone, setPhone] = useState("");
  const [userId, setUserId] = useState("");

  const handleAddUer = (e) => {
    e.preventDefault();
    axios.post(
      'http://localhost:5000/user',
      {
        "name": name,
        "place": place,
        "phone": phone
      }
    ).then(response => {
      setName("");
      setPlace("");
      setPhone("");
      window.location.reload();
      console.log(response);
    })
  }

  const handleModifyUer = (e) => {
    e.preventDefault();
    axios.put(
      `http://localhost:5000/user/${userId}`,
      {
        "name": name,
        "place": place,
        "phone": phone
      }
    ).then(response => {
      setUserId("");
      setName("");
      setPlace("");
      setPhone("");
      window.location.reload();
      console.log(response);
    })
  }

  const handleDeleteUser = (e) => {
    e.preventDefault();
    axios.delete(
      `http://localhost:5000/user/${userId}`
    ).then(response => {
      setUserId("");
      window.location.reload();
      console.log(response);
    })
  }

  return (
    <div>
      <div className="flex items-center w-full mb-4">
        <div className="flex mx-auto mt-10">
          <label htmlFor="my-modal-1" className="btn mr-2 modal-button">添加新联系人</label>
          <label htmlFor="my-modal-2" className="btn mr-2 modal-button">修改联系人信息</label>
          <label htmlFor="my-modal-3" className="btn mr-2 modal-button">删除联系人信息</label>

          {/* 添加新联系人 */}
          <input type="checkbox" id="my-modal-1" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box relative">
              <label htmlFor="my-modal-1" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
              <h3 className="text-lg font-bold">添加新联系人</h3>
              <form className="flex flex-col mt-4">
                <input onChange={(e) => setName(e.target.value)} type="text" placeholder="输入姓名" className="mb-2 input input-bordered w-full max-w-xs" />
                <input onChange={(e) => setPlace(e.target.value)} type="text" placeholder="输入地址" className="mb-2 input input-bordered w-full max-w-xs" />
                <input onChange={(e) => setPhone(e.target.value)} type="text" placeholder="输入电话号码" className="mb-2 input input-bordered w-full max-w-xs" />
                <button type="submit" onClick={handleAddUer} className="btn">提交</button>
              </form>
            </div>
          </div>

          {/* 修改新联系人 */}
          <input type="checkbox" id="my-modal-2" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box relative">
              <label htmlFor="my-modal-2" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
              <h3 className="text-lg font-bold">修改联系人信息</h3>
              <form className="flex flex-col mt-4">
                <input onChange={(e) => setUserId(e.target.value)} type="text" placeholder="输入用户id" className="mb-2 input input-bordered w-full max-w-xs" />
                <input onChange={(e) => setName(e.target.value)} type="text" placeholder="输入姓名" className="mb-2 input input-bordered w-full max-w-xs" />
                <input onChange={(e) => setPlace(e.target.value)} type="text" placeholder="输入地址" className="mb-2 input input-bordered w-full max-w-xs" />
                <input onChange={(e) => setPhone(e.target.value)} type="text" placeholder="输入电话号码" className="mb-2 input input-bordered w-full max-w-xs" />
                <button type="submit" onClick={handleModifyUer} className="btn">提交</button>
              </form>
            </div>
          </div>

          {/* 删除新联系人 */}
          <input type="checkbox" id="my-modal-3" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box relative">
              <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
              <h3 className="text-lg font-bold">删除联系人信息</h3>
              <form className="flex flex-col mt-4">
                <input onChange={(e) => setUserId(e.target.value)} type="text" placeholder="输入用户id" className="mb-2 input input-bordered w-full max-w-xs" />
                <button type="submit" onClick={handleDeleteUser} className="btn">提交</button>
              </form>
            </div>
          </div>



        </div>

      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="text-center">
              <th>联系人id</th>
              <th>姓名</th>
              <th>地址</th>
              <th>电话</th>
            </tr>
          </thead>
          <tbody>

            {user?.map((item) => {
              return (
                <tr key={item.id} className="text-center">
                  <th>{item.id}</th>
                  <td>{item.name}</td>
                  <td>{item.place}</td>
                  <td>{item.phone}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
