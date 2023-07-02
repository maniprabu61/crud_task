import React, { useState, useEffect } from "react";
import { Table, Button } from 'antd';
import { useNavigate} from 'react-router-dom'
import AuthService from "../services/auth.service";


const Userlist = () => {
  const navigate = useNavigate();
  const [data, setdata] = useState([]);
  const [Uiref, setUiref] = useState(0);
  useEffect(() => {
    fetchdata()
  }, [Uiref]);
  const fetchdata =async()=>{
    const {data} = await AuthService.loadAllusers();
    let newData = Array();
    // const data = JSON.parse(localStorage.getItem('users'));
    data.map((data,idx)=>{
      newData.push({...data,"key":idx+1});
    })
    setdata(newData);
  }
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '25%'
      // render: text => <a href="#">{text}</a>,
    },
      {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      width: '25%'
    },
     {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '25%'
    }, 
    {
      title: 'Action',
      dataIndex: '_id',
      key: '_id',
      width: '25%',
      render: (id,val) => (<Button className="update_btn" onClick={()=>navigate(`/register/${val._id}`)} type="primary">Update</Button>),
    }
  ];

const [SelectedRows, setSelectedRows] = useState([{
  "_id": "",
  "username": "",
  "email": "",
  "password": ""
}]);
const selecedRows=(record, selected, selectedRows)=>{
setSelectedRows(selectedRows)
}
const selecedAllRows=(record, selected, selectedRows)=>{
  setSelectedRows(selected);
  }

  const logOut = () => {
    AuthService.deleteAllusers();
    navigate('/register')
  };
const _delete = async ()=>{
  if(data.length === SelectedRows.length){
    SelectedRows.map(user=>(
      AuthService.deleteuser(user._id).then(res=>console.log('resAll',res)).catch(err=>console.log('errAll',err))
     ));
     setTimeout(() => {
      setUiref(Uiref + 1)
      alert('Deleted successfully..!');
      logOut();
     }, 500);
   }else{
    SelectedRows.map(user=>(
      AuthService.deleteuser(user._id).then(res=>console.log('res',res)).catch(err=>console.log('err',err))
     ));
     setTimeout(() => {
      setUiref(Uiref + 1)
      alert('Deleted successfully..!');
      window.location.reload();
     }, 500);
   }
    
}

 const title = () =><div className="header_action_btns"><Button className="adduser_btn" onClick={()=>navigate('/register')} type="primary" >Add User</Button> <Button className="delete_btn" onClick={_delete} type="primary" danger>Delete</Button></div>;
 const state = {
    bordered: true,
    loading: data?false:true,
    pagination: true,
    size: 'default',
    title,
    rowSelection: {onSelect:selecedRows,onSelectAll:selecedAllRows},
  }
  return (
    <div className="container">
        <h3>Users List</h3>
        <div className="userList">
        <Table {...state} columns={columns} dataSource={data} />
        </div>
    </div>
  );
};

export default Userlist;
