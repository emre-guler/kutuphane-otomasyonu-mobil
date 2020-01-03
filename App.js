import LoginPage from './screens/LoginPage';
import SigninPage from './screens/SigninPage';
import LoadingPage from './screens/Loading';
import menuPage from './screens/menuPage';
import bookOperation from './screens/bookOperation';
import customerOperation from './screens/customerOperation';
import onLentBook from './screens/onLentBook';
import giveLentBook from './screens/giveLentBook';
import addCustomerPage from './screens/addCustomerPage';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import addBookPage from './screens/addBookPage';
console.disableYellowBox = true;
const AppNavigator  = createStackNavigator({
  login : {
    screen : LoginPage,
    header : null
  },
  loadingAnim: {
    screen : LoadingPage,
    header : null
  },
  signin : {
    screen : SigninPage,
    header : null
  },
  menu : {
    screen : menuPage,
    header : null
  },
  bookoperaiton : {
    screen : bookOperation,
    header :  null
  },
  customeroperation : {
    screen : customerOperation,
    header : null
  },
  onlentbook :{
    screen: onLentBook,
    header: null
  },
  givelentbook: {
    screen: giveLentBook,
    header: null
  },
  addcustomer: {
    screen: addCustomerPage,
    header: null
  },
  addbook:{
    screen: addBookPage,
    header: null
  }
})
const AppConteiner = createAppContainer(AppNavigator);
export default AppConteiner;