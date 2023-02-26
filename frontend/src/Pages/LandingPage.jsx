import React from 'react';
import { Button, Flex } from '@chakra-ui/react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const LandingPage = () => {

    const navigate = useNavigate()

    const getdata = () => {
        fetch("https://randomuser.me/api/").then((res) => {
            return res.json()
        }).then((res) => {
            senddata(res.results)
        }).catch((err) => {
            console.log(err)
        })
    }

    const fetchuser =() => {
        for (let i = 0; i < 50; i++) {
           getdata()
        }
    }

    async function senddata(data) {
        let obj = {
            name: data[0].name.first,
            address: data[0].location.city,
            picture:data[0].picture.medium
        }
        await axios.post("http://localhost:3001/adduser", obj).then((res) => {
            // console.log(res.data.responce)
            if(res.data.responce == -1){
                alert("Duplicate Value")
            }
        }).catch((err) => {
            console.log("Error is", err)
        })
    }

    function deletebutton(){
        axios.get("http://localhost:3001/delete").then((res)=>{
            if(res.data.responce == 1){
                alert("Success")
            }
        })
    }

    return (
        <>
            <Flex justifyContent={"space-between"} margin="auto" width={"50%"} marginTop="10rem">
                <Button onClick={fetchuser} colorScheme='teal' size='md'>
                    Fetch Users
                </Button>
                <Button onClick={deletebutton} colorScheme='teal' size='md'>
                    Delete Users
                </Button>
                <Button colorScheme='teal' size='md' onClick={()=>navigate("/page2")}>
                    User Details
                </Button>
            </Flex>
        </>
    );
};

export default LandingPage;