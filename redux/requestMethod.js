import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const BASE_URL = "http://139.162.11.30:80/api";
const SELLERTOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMmQ5OTNhYjdkMGVjN2JhNzU5YmMzNSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1MTgxNDg3MywiZXhwIjoxNjUyNDE5NjczfQ.jycw7YM-gxxEEdDmgYyyo1Dy48CF-TVmNyU7vLgi314";


export const publicRequest = axios.create({
    baseURL: BASE_URL,
})

export const sellerRequest = axios.create({
    baseURL: BASE_URL,
    header:{token: `${SELLERTOKEN}`}
})