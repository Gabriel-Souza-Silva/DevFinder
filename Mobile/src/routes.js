import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'


import Main from './pages/Main'
import Profile from './pages/Profile'


const Routes = createAppContainer(
    createStackNavigator({
        Main:{
            screen: Main,
            navigationOptions:{
                title: 'Dev Finder '
            }
        },
        Profile:{
            screen: Profile,
            navigationOptions:{
                title:'Perfil'
            }
        }
    },{
        defaultNavigationOptions:{
            headerTitleAlign:'center',
            headerTitleStyle:{
                fontWeight:'bold'
            },
            headerBackTitle:null,
            headerTintColor:'#FFF',
            headerStyle:{
                backgroundColor:'#7D40E7',
            }
        }
    })
)


export default Routes