import http from 'k6/http';
import {check} from 'k6';

export default function(){
    const res = http.put('https://reqres.in/api/users/2');
    const payload = JSON.stringify({
        name : "morpheus",
        job : "staff",
        completed: 'true'
    });
      
    const params = {
        headers : {
        'Content-Type' : 'application/json',
        },
    };

    const checkOutput = check (
        res,
        {
            'response code was 200': (res) => res.status == 200,
        },
    );
 }
