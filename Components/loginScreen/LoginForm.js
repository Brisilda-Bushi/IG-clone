import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import { Formik } from "formik";
import * as Yup from "yup";
import Validator from "email-validator"

const LoginForm = () => {
  const LoginFormSchema = Yup.object().shape({
    email: Yup.string().email().required("An email is required"),
    password: Yup.string()
    .required()
    .min(8, "Your password has to have at least 8 characters")
  })

  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{email: "", password: ""}}
        onSubmit= {() => {
          console.log(values)
        }}
        validationSchema={LoginFormSchema}
        validateOnMount={true}
      >
        {({handleChange, handleBlur, handleSubmit, values, isValid }) => (
        <>
        <View style={styles.inputField}>
          <TextInput
            placeholderTextColor= "#444" 
            placeholder='Phone number, username or email'
            autoCapitalize='none'
            keyboardType='email-address'
            textContentType='emailAddress'
            autoFocus={true}
          />
        </View>

        <View style={styles.inputField}>
          <TextInput
            placeholderTextColor= "#444" 
            placeholder='Password'
            autoCapitalize='none'
            autoCorrect={false}
            secureTextEntry={true}
            textContentType="password"
          />
        </View>
        <View style={{ alignItems: "flex-end", marginBottom: 30}}>
          <TouchableOpacity>
          <Text style={{color: "#6BB0F5"}}>Forgot Password</Text>
          </TouchableOpacity>
        </View>
        <Pressable titleSize={20} style={styles.button} onPress={() => console.log("You clicked me!")} >  
            <Text style={styles.buttonText}>Log In</Text>  
        </Pressable>

        <View style={styles.signupContainer}>
            <Text>Don't have an account?</Text>
            <TouchableOpacity>
              <Text style={{color: "#6BB0F5"}}> Sign Up</Text>
            </TouchableOpacity>
        </View>
        </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
    wrapper:{
      marginTop: 80
    },
    inputField: {
      borderRadius: 4,
      padding: 12,
      backgroundColor: "#FAFAFA",
      marginBottom: 10,
      borderWidth: 1,
    },
    button: {
      backgroundColor: "#0096F6",
      alignItems: "center",
      justifyContent: "center",
      minHeight: 42,
      borderRadius: 4,
    },
    buttonText: {
      fontWeight: "600",
      color: "#FFF",
      fontSize: 20,
    },
    signupContainer:{
      flexDirection:"row",
      width: "100%",
      justifyContent: "center",
      marginTop: 50,
    }
})

export default LoginForm;
