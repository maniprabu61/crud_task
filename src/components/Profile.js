import React, { useState, useEffect } from "react";
import { EditOutlined, EllipsisOutlined, SettingOutlined, UserOutlined,
  AppstoreOutlined,
  ContainerOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  MenuUnfoldOutlined,
  MailOutlined,
  DesktopOutlined
 } from '@ant-design/icons';
import { Avatar, Card, Skeleton, Switch, Button, Menu } from 'antd';
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";





const Profile = () => {

  const { Meta } = Card;
  const [currentUser, setcurrentUser] = useState({ username: '',email: ''});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    setcurrentUser(currentUser);
    currentUser ? setLoading(false):setLoading(true);
  }, []);

  

  return (
    <div className="container">
    <div className="card_container">
      <h1>Profile</h1>
   
        <Card
          className="Profile_card"
          style={{
            width: 200,
            marginTop: 16,
          }}
          cover={<img alt="example" src="/logo/dummy_profile.webp" />}

        >
          <Skeleton loading={loading} avatar active>
            <Meta
              // avatar={<Avatar size="large" icon={<UserOutlined />}/>}
              title={currentUser.username}
              description={currentUser.email}
            />
          </Skeleton>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
