import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../Component/Home';
import Signin from '../Screens/Signin';
import Signup from '../Screens/Signup';
import navigationStrings from '../constants/navigationStrings';
import Slider from '../HomeComponent/Slider';
import Subcategories from '../HomeComponent/Subcategories';
import ButtomTabs from '../HomeComponent/ButtomTabs';
import DetailsScreen from '../Screens/view Screen/DetailsScreen';
import MainCategoryforButtonTab from '../Screens/view Screen/MainCategoryforButtonTab';
import Products from '../Screens/view Screen/Products';
import UserOrder from '../UserOrder/UserOrder';
import Search from '../HomeComponent/Search';
import Profile from '../Component/Profile';
import Review from '../Review/Review';
import Cart from '../Screens/view Screen/Cart';
import Followingstore from '../FollowingStore/Followingstore';
import ProductPage from '../Admin/ProductPage/ProductPage';
import UpdateProfile from '../Component/UpdateProfile';
import Forgotpassword from '../Screens/Forgotpassword';
import Livestream from '../Screens/view Screen/Livestream';
import SellerSignin from '../Screens/SellerSignin';
import SellerSignup from '../Screens/SellerSignup';
import AmHome from '../Admin/HomeForAdmin/AmHome';
import Sales from '../Admin/Sales/Sales';
import CreateProduct from '../Admin/CreateProduct/CreateProduct'
import Income from '../Admin/Income/Income'
import Order from '../Admin/Order/Order'
import ProductUpdate from '../Admin/Product Update page/ProductUpdate';
import Totalsale from '../Admin/Totalsale/Totalsale'
import ProductList from '../Admin/ProductList/Productlist'
import Pendingorderlist from '../Admin/Pendingorderlist/Pendingorderlist'
import SellerInformation from '../Admin/SellerInfomation/SellerInformation';
import ProductsForsubcategory from '../Screens/view Screen/ProductsForsubcategory';
// import { sellerlogin } from '../redux/apiCalls';
import Sidemenu from '../Admin/Sidemenu';
import ChangeorderStatus from '../Admin/changeorderStatus/ChangeorderStatus';
import ShippingInfo from '../Screens/view Screen/ShippingInfo';
import UpdateSellerInformation from '../Admin/SellerInfomation/UpdateSellerInformation';
import PasswordUpdate from '../HomeComponent/PasswordUpdate/PasswordUpdate';
import SearchProducts from '../Screens/view Screen/SearchProducts'
import SellerUpdatePassword from '../Admin/SellerInfomation/SellerUpdatePassword/SellerUpdatePassword';
import SellerBankAccount from '../Admin/SellerInfomation/sellerBankAccount/SellerBankAccount';
import UpdateSellerBankAccount from '../Admin/SellerInfomation/UpdateSellerBankAccount/UpdateSellerBankAccount';
import GoLive from "../Admin/GoLive/GoLive"
import { useSelector } from 'react-redux';
import OTP from '../HomeComponent/OTP';
import ForgotPasswordOTP from '../HomeComponent/ForgotPasswordOTP';
import Newpassword from "../Screens/newPassword/Newpassword"
import SellerForgotPasswordOTP from '../HomeComponent/SellerForgotPasswordOTP';
import SellerForgotpassword from '../Screens/SellerForgotpassword';
import SellerOTP from '../HomeComponent/SellerOTP';
import UserFeed from '../Component/UserFeed';
import UserProfileFeed from '../Component/UserProfileFeed';
import UserIncome from '../Component/UserIncome';
import Returnorder from '../Admin/Returnorder/Returnorder';
import UserBankAccount from '../Screens/view Screen/UserBankAccount/UserBankAccount';
import UpdateUserBankAccount from '../Screens/view Screen/UpdateUserBankAccount/UpdateUserBankAccount';
import SellerTransaction from '../Admin/SellerTransaction/SellerTransaction';
import UserTransaction from '../Screens/view Screen/UserTransaction/UserTransaction';
import Discover from '../Component/Discover';
import Makeup from '../Component/Makeup';
import Fashion from '../Component/Fashion';

const Stack = createNativeStackNavigator();

function Routees() {
  const seller = useSelector((state) => state.seller);
  const user = useSelector((state) => state.user);
  
  return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false,}}>
          <Stack.Screen name={navigationStrings.Home} component={Home}/>
          <Stack.Screen name={navigationStrings.Discover} component={Discover}/>
          <Stack.Screen name={navigationStrings.Makeup} component={Makeup}/>
          <Stack.Screen name={navigationStrings.Fashion} component={Fashion}/>
          
          <Stack.Screen name={navigationStrings.Totalsale} component={Totalsale}/>
          <Stack.Screen name={navigationStrings.UserFeed} component={user?.currentUser ? UserFeed : Signin} />

          <Stack.Screen name={navigationStrings.UserProfileFeed} component={user?.currentUser ? UserProfileFeed : Signin} />
          <Stack.Screen name={navigationStrings.SellerTransaction} component={seller?.currentSeller ? SellerTransaction : ''} />
          <Stack.Screen name={navigationStrings.UserTransaction} component={UserTransaction} />

          <Stack.Screen name={navigationStrings.UserBankAccount} component={user?.currentUser ? UserBankAccount : ""} />
          <Stack.Screen name={navigationStrings.UpdateUserBankAccount} component={user?.currentUser ? UpdateUserBankAccount : ""} />
          <Stack.Screen name={navigationStrings.Returnorder} component={Returnorder} />
          <Stack.Screen name={navigationStrings.UserIncome} component={user?.currentUser ? UserIncome:""} />
          <Stack.Screen name={navigationStrings.Signin} component={Signin} />
          <Stack.Screen name={navigationStrings.Signup} component={Signup} />
          <Stack.Screen name={navigationStrings.DetailsScreen} component={DetailsScreen}/>
          <Stack.Screen name={navigationStrings.ButtomTabs} component={ButtomTabs}/>
          <Stack.Screen name={navigationStrings.MainCategoryforButtonTab} component={MainCategoryforButtonTab}/>
          <Stack.Screen name={navigationStrings.Products} component={Products}/>
          <Stack.Screen name={navigationStrings.UserOrder} component={UserOrder}/>
          <Stack.Screen name={navigationStrings.Search} component={Search}/>
          <Stack.Screen name={navigationStrings.Profile} component={ user?.currentUser !== null ? Profile : Signin}/>
          <Stack.Screen name={navigationStrings.SearchProducts} component={SearchProducts}/>
          <Stack.Screen name={navigationStrings.Livestream} component={Livestream}/>
          <Stack.Screen name={navigationStrings.ProductsForsubcategory} component={ProductsForsubcategory}/>
          <Stack.Screen name={navigationStrings.Cart} component={Cart} />
          <Stack.Screen name={navigationStrings.Review} component={Review} />
          <Stack.Screen name={navigationStrings.UpdateSellerInformation} component={seller?.currentSeller ? UpdateSellerInformation : SellerSignin}/>
          <Stack.Screen name={navigationStrings.Pendingorderlist} component={Pendingorderlist}/>
          <Stack.Screen name={navigationStrings.ChangeorderStatus} component={seller?.currentSeller ? ChangeorderStatus : ""}/>
          <Stack.Screen name={navigationStrings.Followingstore} component={Followingstore}/>
          <Stack.Screen name={navigationStrings.SellerInformation} component={seller?.currentSeller ? SellerInformation : ""}/>
          <Stack.Screen name={navigationStrings.ProductPage} component={ProductPage}/>
          <Stack.Screen name={navigationStrings.UpdateProfile} component={UpdateProfile}/>
          <Stack.Screen name={navigationStrings.Forgotpassword} component={Forgotpassword}/>
          <Stack.Screen name={navigationStrings.SellerSignup} component={SellerSignup}/>
          <Stack.Screen name={navigationStrings.SellerSignin} component={SellerSignin}/>
          <Stack.Screen name={navigationStrings.AmHome} component={seller ? AmHome : SellerSignin}/>
          <Stack.Screen name={navigationStrings.Sales} component={Sales}/>
          <Stack.Screen name={navigationStrings.CreateProduct} component={seller ? CreateProduct : SellerSignin}/>
          <Stack.Screen name={navigationStrings.OTP} component={user?.currentUser?.status === "Pending" ? OTP : Home} />
          <Stack.Screen name={navigationStrings.SellerOTP} component={seller?.currentSeller?.status === "Pending" ? SellerOTP : Home} />
          <Stack.Screen name={navigationStrings.ForgotPasswordOTP} component={ForgotPasswordOTP} />
          <Stack.Screen name={navigationStrings.SellerForgotPasswordOTP} component={SellerForgotPasswordOTP} />
          <Stack.Screen name={navigationStrings.SellerForgotpassword} component={SellerForgotpassword} />
          <Stack.Screen name={navigationStrings.Newpassword} component={Newpassword} />
          <Stack.Screen name={navigationStrings.Income} component={Income}/>
          <Stack.Screen name={navigationStrings.Order} component={Order}/>
          <Stack.Screen name={navigationStrings.ProductUpdate} component={ seller?.currentSeller ? ProductUpdate : ""}/>
          <Stack.Screen name={navigationStrings.ProductList} component={ seller?.currentSeller ? ProductList : ""}/>

          <Stack.Screen name={navigationStrings.Sidemenu} component={Sidemenu}/>
          <Stack.Screen name={navigationStrings.ShippingInfo} component={ShippingInfo}/>
          <Stack.Screen name={navigationStrings.PasswordUpdate} component={PasswordUpdate}/>
          <Stack.Screen name={navigationStrings.SellerUpdatePassword} component={seller?.currentSeller ? SellerUpdatePassword : ""}/>
          <Stack.Screen name={navigationStrings.SellerBankAccount} component={seller?.currentSeller ? SellerBankAccount : ""}/>
          <Stack.Screen name={navigationStrings.UpdateSellerBankAccount} component={seller?.currentSeller ? UpdateSellerBankAccount :""}/>
          <Stack.Screen name={navigationStrings.GoLive} component={seller?.currentSeller ? GoLive : ''} />

        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default Routees;
