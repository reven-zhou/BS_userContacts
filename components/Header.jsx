import React from "react";

const Header = () => {
  return (
    <div>
      <button className="btn">查看联系人信息</button>
      <button className="btn btn-primary">添加新联系人</button>
      <button className="btn btn-secondary">修改联系人信息</button>
      <button className="btn btn-accent">删除联系人</button>
    </div>
  );
};

export default Header;
