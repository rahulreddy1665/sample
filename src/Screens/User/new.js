import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { Arrowleft } from "../assets/icons/Arrowleft";
import { Checkmarkicon } from "../assets/icons/Checkmarkicon";
import { ReportIcon } from "../assets/icons/Reporticon";
import { Xmarkicon } from "../assets/icons/Xmarkicon";
import { IMAGE_URLS, URL_CONSTANTS } from "../constants/constant";
import { colors, commonStyles } from "../styles/Viprastyles";

const { width } = Dimensions.get("window");
const SPACING = 10;
const THUMB_SIZE = 65;
const HEADER_HEIGHT = 450;
const DetailedInfo = ({ navigation, route }) => {
  const { Value } = route.params;

  const [images, setImages] = useState([]);

  useEffect(() => {
    // for fetching the data of marriage_type,subcaste,sect,
    const fetchData = () => {
      try {
        AsyncStorage.getItem("sp_admin").then((value) => {
          if (value != null) {
            axios
              .get(URL_CONSTANTS.DETAILED_INFO + Value, {
                headers: {
                  "x-access-token": value,
                },
              })
              .then((response) => {
                var array = [];
                var image = response.data.image.split(",");
                for (let i = 0; i < image.length; i++) {
                  array[i] = {
                    id: (i + 1).toString(),
                    image: IMAGE_URLS.PROFILEIMAGE_URL + image[i],
                  };
                }

                setImages(array);
                setDetaileddata(response.data);
                setValue(response.data.value);
              })
              .catch((error) => {
                console.log("errormessage", error.response.data.message);
              });
          }
        });
      } catch (error) {
        setVisible(!visible);
      }
    };
    fetchData();
  }, []);

  const [Toggle, SetToggle] = useState(false);
  const [detaileddata, setDetaileddata] = useState("");
  const [user_id, setValue] = useState("");

  const handleToggle = () => {
    SetToggle(false);
  };
  const handleToggle1 = () => {
    SetToggle(true);
  };

  const flatListRef = useRef();
  const [indexSelected, setIndexSelected] = useState(0);
  const [phoneview, setPhoneview] = useState(true);
  const carouselRef = useRef();
  const onTouchThumbnail = (touched) => {
    if (touched === indexSelected) return;

    carouselRef?.current?.snapToItem(touched);
  };

  const onSelect = (indexSelected) => {
    setIndexSelected(indexSelected);
    flatListRef?.current?.scrollToOffset({
      offset: indexSelected * THUMB_SIZE,
      animated: true,
    });
  };

  const handlePhone = () => {
    setPhoneview(false);
    try {
      const req = {
        user_id: user_id,
      };
      AsyncStorage.getItem("sp_admin").then((value) => {
        if (value != null) {
          axios
            .post(URL_CONSTANTS.REQUEST_URL, req, {
              headers: {
                "x-access-token": value,
              },
            })
            .then((response) => {
              setDetaileddata(response.data);
              setPhoneview(true);
            })
            .catch((error) => {
              console.log("error", error);
              setPhoneview(true);
            });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const acceptphone = () => {
    setPhoneview(false);
    try {
      const req = {
        request_user: user_id,
      };
      AsyncStorage.getItem("sp_admin").then((value) => {
        if (value != null) {
          axios
            .post(URL_CONSTANTS.ACCEPT_URL, req, {
              headers: {
                "x-access-token": value,
              },
            })
            .then((response) => {
              console.log(response.data);
              var data = detaileddata;
              data.request_by[0].status = 1;
              setDetaileddata(data);
              setPhoneview(true);
            })
            .catch((error) => {
              console.log("error", error);
              setPhoneview(true);
            });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const rejectPhone = () => {
    setPhoneview(false);
    try {
      const req = {
        request_user: user_id,
      };
      AsyncStorage.getItem("sp_admin").then((value) => {
        if (value != null) {
          axios
            .post(URL_CONSTANTS.REJECT_URL, req, {
              headers: {
                "x-access-token": value,
              },
            })
            .then((response) => {
              var data = detaileddata;
              data.request_by[0].status = 2;
              setDetaileddata(data);
              setPhoneview(true);
            })
            .catch((error) => {
              console.log("error", error);
              setPhoneview(true);
            });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={[commonStyles.Container, { backgroundColor: "#FFFFFF" }]}>
      {/* Back Button */}
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={commonStyles.backButton}
            onPress={() => navigation.navigate("Drawer")}
          >
            <Arrowleft stroke={colors.BLACK} />
          </TouchableOpacity>
          <Text style={[commonStyles.Screenheading, { marginLeft: 20 }]}>
            User Details
          </Text>
        </View>
        <View style={{ flexDirection: "row", marginRight: 10 }}>
          <TouchableOpacity
            style={commonStyles.backButton}
            onPress={() => navigation.navigate("Drawer")}
          >
            <ReportIcon stroke={colors.RED} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 10,
            height: 450,
          }}
        >
          <Carousel
            layout="default"
            data={images}
            ref={carouselRef}
            sliderWidth={width}
            itemWidth={width}
            onSnapToItem={(index) => onSelect(index)}
            renderItem={({ item, index }) => (
              <Image
                key={index}
                style={{ width: "100%", height: "100%" }}
                resizeMode="cover"
                source={{
                  uri: item.image,
                }}
              />
            )}
          />
          <View>
            <FlatList
              horizontal={true}
              data={images}
              ref={flatListRef}
              legacyImplementation={false}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => onTouchThumbnail(index)}
                >
                  <Image
                    style={{
                      width: THUMB_SIZE,
                      height: THUMB_SIZE,
                      borderWidth: index === indexSelected ? 2 : 0.75,
                      borderColor: index === indexSelected ? "orange" : "white",
                    }}
                    source={{
                      uri: item.image,
                    }}
                  />
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
        <ScrollView
          style={{ flex: 1, backgroundColor: "white" }}
          contentContainerStyle={{
            paddingTop: 450,
            paddingHorizontal: 10,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              backgroundColor: "#f8f8f8",
              padding: 8,
              flexDirection: "row",
              justifyContent: "center",
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
            }}
          >
            <TouchableOpacity
              style={{
                marginRight: 10,
                padding: 10,
                borderRadius: 15,
                borderBottomWidth: Toggle === false ? 1 : 0,
                borderBottomColor: Toggle === false ? "#FFB367" : null,
              }}
              onPress={handleToggle}
            >
              <Text
                style={{
                  fontFamily: "Poppins-Regular",
                  color: Toggle === false ? "#FFB367" : "black",
                }}
              >
                Personal Details
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: 10,
                borderRadius: 15,
                borderBottomColor: Toggle === true ? "#FFB367" : null,
                borderBottomWidth: Toggle === true ? 1 : 0,
              }}
              onPress={handleToggle1}
            >
              <Text
                style={{
                  fontFamily: "Poppins-Regular",
                  color: Toggle === true ? "#FFB367" : "black",
                }}
              >
                Contact Details
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ display: Toggle === false ? "flex" : "none" }}>
            <View
              style={{
                backgroundColor: "#FFFFFF",
                padding: 8,
                paddingLeft: 15,
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{ color: "#9E9E9E", fontSize: 12, marginBottom: 3 }}
                >
                  Date of Birth
                </Text>
                <Text style={commonStyles.subheading}>
                  {new Date(detaileddata.date_of_birth).toLocaleDateString(
                    "en-GB"
                  )}
                </Text>
              </View>
            </View>
            <View
              style={{
                borderBottomColor: "#EEEEEE",
                borderBottomWidth: 1,
              }}
            />
            <View
              style={{
                backgroundColor: "#FFFFFF",
                padding: 8,
                paddingLeft: 15,
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{ color: "#9E9E9E", fontSize: 12, marginBottom: 3 }}
                >
                  Age
                </Text>
                <Text style={commonStyles.subheading}>
                  {Math.floor(
                    (new Date() -
                      new Date(detaileddata.date_of_birth).getTime()) /
                      3.15576e10
                  )}
                </Text>
              </View>
            </View>
            <View
              style={{
                borderBottomColor: "#EEEEEE",
                borderBottomWidth: 1,
              }}
            />
            <View
              style={{
                backgroundColor: "#FFFFFF",
                padding: 8,
                paddingLeft: 15,
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{ color: "#9E9E9E", fontSize: 12, marginBottom: 3 }}
                >
                  Height
                </Text>
                <Text style={commonStyles.subheading}>
                  {detaileddata.height}
                </Text>
              </View>
            </View>
            <View
              style={{
                borderBottomColor: "#EEEEEE",
                borderBottomWidth: 1,
                marginBottom: 10,
              }}
            />
            <View
              style={{
                backgroundColor: "#FFFFFF",
                padding: 8,
                paddingLeft: 15,
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{ color: "#9E9E9E", fontSize: 12, marginBottom: 3 }}
                >
                  Raashi
                </Text>
                {typeof detaileddata.rashi !== "undefined" ||
                detaileddata.rashi != null ? (
                  <Text style={commonStyles.subheading}>
                    {detaileddata.rashi.label}
                  </Text>
                ) : (
                  <Text style={commonStyles.subheading}>-</Text>
                )}
              </View>
            </View>
            <View
              style={{
                borderBottomColor: "#EEEEEE",
                borderBottomWidth: 1,
              }}
            />
            <View
              style={{
                backgroundColor: "#FFFFFF",
                padding: 8,
                paddingLeft: 15,
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{ color: "#9E9E9E", fontSize: 12, marginBottom: 3 }}
                >
                  Nakshatra
                </Text>
                {typeof detaileddata.nakshathra != "undefined" ||
                detaileddata.nakshathra != null ? (
                  <Text style={commonStyles.subheading}>
                    {detaileddata.nakshathra.label}
                  </Text>
                ) : (
                  <Text style={commonStyles.subheading}>-</Text>
                )}
              </View>
            </View>
            <View
              style={{
                borderBottomColor: "#EEEEEE",
                borderBottomWidth: 1,
              }}
            />
            <View
              style={{
                backgroundColor: "#FFFFFF",
                padding: 8,
                paddingLeft: 15,
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{ color: "#9E9E9E", fontSize: 12, marginBottom: 3 }}
                >
                  Gothra
                </Text>
                {typeof detaileddata.gothra != "undefined" ||
                detaileddata.gothra != null ? (
                  <Text style={commonStyles.subheading}>
                    {detaileddata.gothra.label}
                  </Text>
                ) : (
                  <Text style={commonStyles.subheading}>-</Text>
                )}
              </View>
            </View>
            <View
              style={{
                borderBottomColor: "#EEEEEE",
                borderBottomWidth: 1,
                marginBottom: 10,
              }}
            />
            <View
              style={{
                backgroundColor: "#FFFFFF",
                padding: 8,
                paddingLeft: 15,
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{ color: "#9E9E9E", fontSize: 12, marginBottom: 3 }}
                >
                  Sub-Caste
                </Text>
                {typeof detaileddata.sub_cast != "undefined" ||
                detaileddata.sub_cast != null ? (
                  <Text style={commonStyles.subheading}>
                    {detaileddata.sub_cast.label}
                  </Text>
                ) : (
                  <Text style={commonStyles.subheading}>-</Text>
                )}
              </View>
            </View>
            <View
              style={{
                borderBottomColor: "#EEEEEE",
                borderBottomWidth: 1,
              }}
            />
            <View
              style={{
                backgroundColor: "#FFFFFF",
                padding: 8,
                paddingLeft: 15,
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{ color: "#9E9E9E", fontSize: 12, marginBottom: 3 }}
                >
                  Sect(Pangada)
                </Text>
                {typeof detaileddata.sect != "undefined" ||
                detaileddata.sect != null ? (
                  <Text style={commonStyles.subheading}>
                    {detaileddata.sect.label}
                  </Text>
                ) : (
                  <Text style={commonStyles.subheading}>-</Text>
                )}
              </View>
            </View>
            <View
              style={{
                borderBottomColor: "#EEEEEE",
                borderBottomWidth: 1,
                marginBottom: 10,
              }}
            />
            <View
              style={{
                backgroundColor: "#FFFFFF",
                padding: 8,
                paddingLeft: 15,
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{ color: "#9E9E9E", fontSize: 12, marginBottom: 3 }}
                >
                  No of Brothers,No of Brothers married
                </Text>
                <Text style={commonStyles.subheading}>
                  {detaileddata.no_brothers} ,
                  <Text>{detaileddata.no_brothers_married}</Text>
                </Text>
              </View>
            </View>
            <View
              style={{
                borderBottomColor: "#EEEEEE",
                borderBottomWidth: 1,
              }}
            />
            <View
              style={{
                backgroundColor: "#FFFFFF",
                padding: 8,
                paddingLeft: 15,
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{ color: "#9E9E9E", fontSize: 12, marginBottom: 3 }}
                >
                  No of Sisters,No of Sisters married
                </Text>
                <Text style={commonStyles.subheading}>
                  {detaileddata.no_sisters} ,
                  <Text>{detaileddata.no_sisters_married}</Text>
                </Text>
              </View>
            </View>
            <View
              style={{
                borderBottomColor: "#EEEEEE",
                borderBottomWidth: 1,
                marginBottom: 10,
              }}
            />
            <View
              style={{
                backgroundColor: "#FFFFFF",
                padding: 8,
                paddingLeft: 15,
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{ color: "#9E9E9E", fontSize: 12, marginBottom: 3 }}
                >
                  Working in
                </Text>
                <Text style={commonStyles.subheading}>
                  {detaileddata.working_in}
                </Text>
              </View>
            </View>
            <View
              style={{
                borderBottomColor: "#EEEEEE",
                borderBottomWidth: 1,
              }}
            />
            <View
              style={{
                backgroundColor: "#FFFFFF",
                padding: 8,
                paddingLeft: 15,
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{ color: "#9E9E9E", fontSize: 12, marginBottom: 3 }}
                >
                  Working as
                </Text>
                <Text style={commonStyles.subheading}>
                  {detaileddata.working_as}
                </Text>
              </View>
            </View>
            <View
              style={{
                borderBottomColor: "#EEEEEE",
                borderBottomWidth: 1,
              }}
            />
            <View
              style={{
                backgroundColor: "#FFFFFF",
                padding: 8,
                paddingLeft: 15,
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{ color: "#9E9E9E", fontSize: 12, marginBottom: 3 }}
                >
                  Salary/Year
                </Text>
                <Text style={commonStyles.subheading}>
                  {detaileddata.salary_pa}
                </Text>
              </View>
            </View>
            <View
              style={{
                borderBottomColor: "#EEEEEE",
                borderBottomWidth: 1,
                marginBottom: 10,
              }}
            />
          </View>
          {/* Contact Details */}
          <View style={{ display: Toggle === true ? "flex" : "none" }}>
            <View
              style={{
                backgroundColor: "#FFFFFF",
                padding: 8,
                paddingLeft: 15,
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{ color: "#9E9E9E", fontSize: 12, marginBottom: 3 }}
                >
                  Full Name
                </Text>
                <Text style={commonStyles.subheading}>
                  {detaileddata.label}
                </Text>
              </View>
            </View>
            <View
              style={{
                borderBottomColor: "#EEEEEE",
                borderBottomWidth: 1,
              }}
            />
            <View
              style={{
                backgroundColor: "#FFFFFF",
                padding: 8,
                paddingLeft: 15,
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{ color: "#9E9E9E", fontSize: 12, marginBottom: 3 }}
                >
                  Email
                </Text>
                <Text style={commonStyles.subheading}>
                  {detaileddata.email}
                </Text>
              </View>
            </View>
            <View
              style={{
                borderBottomColor: "#EEEEEE",
                borderBottomWidth: 1,
              }}
            />
            <View
              style={{
                backgroundColor: "#FFFFFF",
                padding: 8,
                paddingLeft: 15,
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{ color: "#9E9E9E", fontSize: 12, marginBottom: 3 }}
                >
                  Phone
                </Text>
                <View style={{ display: phoneview ? "flex" : "none" }}>
                  {typeof detaileddata.request_by !== "undefined" ? (
                    <>
                      {detaileddata.request_by.length != 0 ? (
                        <>
                          {detaileddata.request_by[0].status == 0 ? (
                            <View>
                              <View style={{ flexDirection: "row" }}>
                                <TouchableOpacity
                                  style={{ flexDirection: "row" }}
                                  onPress={acceptphone}
                                >
                                  <Checkmarkicon stroke={"green"} />
                                  <Text
                                    style={[
                                      commonStyles.subheading,
                                      { color: "green" },
                                    ]}
                                  >
                                    Approve{" "}
                                  </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                  style={{ flexDirection: "row" }}
                                  onPress={rejectPhone}
                                >
                                  <Xmarkicon stroke={"red"} />
                                  <Text
                                    style={[
                                      commonStyles.subheading,
                                      { color: "red" },
                                    ]}
                                  >
                                    Reject{" "}
                                  </Text>
                                </TouchableOpacity>
                              </View>
                            </View>
                          ) : detaileddata.request_by[0].status === 1 ? (
                            <>
                              <Text
                                style={[
                                  commonStyles.subheading,
                                  { color: "orange" },
                                ]}
                              >
                                {detaileddata.phone_number}{" "}
                              </Text>
                            </>
                          ) : (
                            <Text
                              style={[
                                commonStyles.subheading,
                                { color: "orange" },
                              ]}
                            >
                              You have rejected her request{" "}
                            </Text>
                          )}
                        </>
                      ) : detaileddata.request_for.length !== 0 ? (
                        <>
                          {detaileddata.request_for[0].status === 0 ? (
                            <Text
                              style={[
                                commonStyles.subheading,
                                { color: "orange" },
                              ]}
                            >
                              You have already requested her phone{" "}
                            </Text>
                          ) : detaileddata.request_for[0].status === 1 ? (
                            <>
                              <Text
                                style={[
                                  commonStyles.subheading,
                                  { color: "orange" },
                                ]}
                              >
                                {detaileddata.phone_number}{" "}
                              </Text>
                            </>
                          ) : (
                            <Text
                              style={[
                                commonStyles.subheading,
                                { color: "orange" },
                              ]}
                            >
                              Your request has been rejected{" "}
                            </Text>
                          )}
                        </>
                      ) : (
                        <TouchableOpacity onPress={handlePhone}>
                          <Text
                            style={[
                              commonStyles.subheading,
                              { color: "orange" },
                            ]}
                          >
                            Request For Phone{" "}
                          </Text>
                        </TouchableOpacity>
                      )}
                    </>
                  ) : (
                    <TouchableOpacity onPress={handlePhone}>
                      <Text
                        style={[commonStyles.subheading, { color: "orange" }]}
                      >
                        Request For Phone{" "}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
            <View
              style={{
                borderBottomColor: "#EEEEEE",
                borderBottomWidth: 1,
                marginBottom: 10,
              }}
            />
            <View
              style={{
                backgroundColor: "#FFFFFF",
                padding: 8,
                paddingLeft: 15,
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{ color: "#9E9E9E", fontSize: 12, marginBottom: 3 }}
                >
                  Address
                </Text>
                <Text style={commonStyles.subheading}>
                  {detaileddata.address1} + {detaileddata.address2}
                </Text>
              </View>
            </View>
            <View
              style={{
                borderBottomColor: "#EEEEEE",
                borderBottomWidth: 1,
                marginBottom: 10,
              }}
            />

            <View
              style={{
                backgroundColor: "#FFFFFF",
                padding: 8,
                paddingLeft: 15,
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{ color: "#9E9E9E", fontSize: 12, marginBottom: 3 }}
                >
                  Parents
                </Text>
                <Text style={commonStyles.subheading}>
                  {detaileddata.parent_name}
                </Text>
              </View>
            </View>
            <View
              style={{
                borderBottomColor: "#EEEEEE",
                borderBottomWidth: 1,
              }}
            />

            <View
              style={{
                backgroundColor: "#FFFFFF",
                padding: 8,
                paddingLeft: 15,
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{ color: "#9E9E9E", fontSize: 12, marginBottom: 3 }}
                >
                  City
                </Text>
                <Text style={commonStyles.subheading}>{detaileddata.city}</Text>
              </View>
            </View>
            <View
              style={{
                borderBottomColor: "#EEEEEE",
                borderBottomWidth: 1,
                marginBottom: 10,
              }}
            />
          </View>
        </ScrollView>
      </ScrollView>
    </View>
  );
};

export default DetailedInfo;
