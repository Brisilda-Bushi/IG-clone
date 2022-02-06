import React, { useState } from "react";
import { View, Text, TextInput, Image, Button } from "react-native";
import * as Yup from "yup";
import { Formik } from "formik";
import { Divider } from "react-native-elements";

const PLACEHOLDER_IMG =
    "https://www.unfe.org/wp-content/uploads/2019/04/SM-placeholder.png";

const uploadPostSchema = Yup.object().shape({
    imageUrl: Yup.string().url().required("A URL is required"),
    caption: Yup.string().max(2200, "Caption has reached the character limit."),
});

const FormikPostUploader = () => {
    const [thumbnailUrl, setThumbnailUrl] = useState(PLACEHOLDER_IMG);

    return (
        <Formik
            initialValues={{ caption: "", imageUrl: "" }}
            validationSchema={uploadPostSchema}
            validateOnMount={true}
            onSubmit={(values) => console.log(values)}
        >
            {({
                handleBlur,
                handleChange,
                handleSubmit,
                values,
                errors,
                isValid,
            }) => (
                <>
                    <View
                        style={{
                            margin: 20,
                            justifyContent: "space-between",
                            flexDirection: "row",
                        }}
                    >
                        <Image
                            source={{ uri: thumbnailUrl ? thumbnailUrl : PLACEHOLDER_IMG }}
                            style={{ width: 100, height: 100 }}
                        />
                        <View style={{flex: 1, marginLeft: 12}}>
                            <TextInput
                              style={{ color: "white", fontSize: 20 }}
                              placeholder="Write a caption ..."
                              placeholderTextColor="gray"
                              multiline={true}
                              onChangeText={handleChange("caption")}
                              onBlur={handleBlur("caption")}
                              value={values.caption}
                          />
                        </View>
                    </View>
                    <Divider width={0.2} orientation="vertical" />
                    <TextInput
                    onChange={(e) => setThumbnailUrl(e.nativeEvent.text)}
                        style={{ color: "white", fontSize: 18 }}
                        placeholder="Enter Image Url"
                        placeholderTextColor="gray"
                        onChangeText={handleChange("imageUrl")}
                        onBlur={handleBlur("imageUrl")}
                        value={values.imageUrl}
                    />
                    {errors.imageUrl && (
                      <Text style={{fontSize: 10, color: "red"}}>
                        {errors.imageUrl}
                      </Text>
                    )}
                    <Button onPress={handleSubmit} title="Share" disabled={!isValid}></Button>
                </>
            )}
        </Formik>
    );
};

export default FormikPostUploader;
