import React from 'react';
import { Segment, Input, Button } from 'semantic-ui-react'

export function Login(){
    // 这是主页面
    return <div>
    <div style={{margin:'10px'}}>
            <Segment style={{textAlign:'center'}}>
                <h2>请登录</h2>
                <Input id='user' placeholder='用户名' style={{marginBottom:'10px'}}/><br/>
                <Input id='password' type='password' placeholder='密码' style={{marginBottom:'10px'}}/>
                <br/>
                <Button primary content='登录' style={{marginBottom:'10px'}}/>
                <Button content='重置' style={{marginLeft:'20px'}}/>
            </Segment>
        </div>
</div>
}