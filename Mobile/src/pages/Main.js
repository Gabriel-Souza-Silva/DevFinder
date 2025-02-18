import React, {useState,useEffect} from 'react'
import {StyleSheet,Image,View,Text,TextInput, TouchableOpacity,Keyboard} from 'react-native'
import MapView,{Marker,Callout} from 'react-native-maps'
import {requestPermissionsAsync,getCurrentPositionAsync} from 'expo-location'
import {MaterialIcons} from '@expo/vector-icons'
import api from '../services/api'

function Main({navigation}){
    const [devs, setDevs] = useState([])
    const [techs, setTechs] = useState('')
    const [currentPosition, setCurrentPosition] = useState(null)

    useEffect(()=>{
        async function loadInitialPosition(){
            const {granted} = await requestPermissionsAsync()

            if(granted){
                const {coords}  = await getCurrentPositionAsync({
                    //PRA UTILIZAR A LOCALIZAÇÃO DO GPS NO LUGAR DA WEB
                    enableHighAccuracy:true
                });

                const {latitude, longitude} = coords
                
                setCurrentPosition({
                    latitude,
                    longitude,
                    latitudeDelta:0.01,
                    longitudeDelta:0.01
                })
            }
        }

        loadInitialPosition()
    },[])

    if(!currentPosition){
        return null;
    }

    async function loadDevs(){
        const {latitude, longitude} = currentPosition

        const response = await api.get('./search',{
            params:{
                latitude,
                longitude,
                techs: techs
            }
        })

        console.log(response.data.devs)

        setDevs(response.data.devs)
    }

    function handleRegionChanged(region){
        setCurrentPosition(region)
    }

    return(
        <>
            <MapView 
                onRegionChangeComplete={handleRegionChanged} 
                initialRegion={currentPosition} 
                style={styles.map}>

            {devs.map(dev => (
                <Marker 
                key={dev._id}
                coordinate={
                    {
                        latitude:dev.location.coordinates[1],
                        longitude:dev.location.coordinates[0]
                    }}>
                <Image 
                    style={styles.avatar} 
                    source={{uri:dev.avatar_url}}></Image>
                <Callout onPress={()=>{
                    navigation.navigate('Profile',{github_username: dev.github_username})
                }}>
                    <View style={styles.callout}>
                        <Text style={styles.devName}>{dev.name? dev.name : dev.github_username}</Text>
                        <Text style={styles.devBio}>{dev.bio}</Text>
                        <Text style={styles.devTechs}>{dev.techs.join(',')}</Text>
                    </View>
                </Callout>
            </Marker>
            ))}   
            </MapView>

            <View style={styles.searchForm}>
                <TextInput 
                    style={styles.searchInput}
                    placeholder="Buscar devs por techs"
                    placeholderTextColor='#999'
                    autoCapitalize='words'
                    autoCorrect={false}
                    onChangeText={text => setTechs(text)}/>
                <TouchableOpacity onPress={loadDevs} style={styles.loadButton}>
                    <MaterialIcons name="my-location" size={20} color= "#FFF"/>
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    map:{
        flex:1
    },
    avatar:{
        width:54,
        height:54,
        borderRadius:4,
        borderWidth:4,
        borderColor:'#3498db'
    },
    callout:{
        width:260
    },
    devName:{
        fontWeight:'bold',
        fontSize:16
    },
    devBio:{
        color:'#666',
        marginTop:5
    },
    devTechs:{
        marginTop:5
    },

    searchForm:{
        position:'absolute',
        top:20,
        left:20,
        right:20,
        zIndex:5,
        flexDirection:'row'
    },

    searchInput:{
        flex:1,
        height:50,
        backgroundColor:'#FFF',
        color:'#333',
        borderRadius:25,    
        paddingHorizontal:26,
        fontSize:16,
        shadowColor:'#000',
        shadowOpacity:0.2,
        shadowOffset:{
            width:4,
            height:4
        },
        elevation:2
    },
    loadButton:{
        width:50,
        height:50,
        backgroundColor:'#8e4dff',
        borderRadius:25,
        justifyContent:'center',
        alignItems:'center',
        marginLeft:15
    }
})

export default Main;