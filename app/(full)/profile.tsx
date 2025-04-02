import { useSession } from '@/hooks/useSession';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    Alert,
} from 'react-native';
import { Icon } from 'react-native-paper';

export default function ProfileScreen({ navigation }: any) {
    const {deactivateAccount } = useSession();
    const [firstName, setFirstName] = useState('Gaurang');
    const [phone, setPhone] = useState('9875139782');
    const [email, setEmail] = useState('gaurangkhambhaliya2003@gmail.com');
    const [dob, setDob] = useState('2012-03-07');
    const [gender, setGender] = useState('Male');
    const { session , signOut } = useSession();
    

    return (
        <View style={styles.container}>
            {/* Sticky Header */}
            <View style={styles.header}>
                <View style={styles.customeHr} />
                <TouchableOpacity onPress={() => router.back()}>
                    <Text style={styles.backText}>{'←'}</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Personal details</Text>
                <TouchableOpacity>
                    <Text style={styles.saveText}>Save</Text>
                </TouchableOpacity>
            </View>

            {/* Profile Section */}
            <View style={styles.profileContainer}>
                <Icon
                    source="account"
                    color={"#000"}
                    size={80}
                />
            </View>

            {/* Form Fields */}
            <View style={styles.formContainer}>
                <Text style={styles.label}>First name</Text>
                <TextInput
                    style={styles.input}
                    value={firstName}
                    onChangeText={setFirstName}
                />

                <Text style={styles.label}>Phone</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="phone-pad"
                    value={phone}
                    onChangeText={setPhone}
                />

                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />

             
            </View>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={signOut} style={styles.logoutButton}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    // take comfirmation from user via alert
                    // if (confirm('Are you sure you want to delete your account?')) {
                        // deactivateAccount();
                    // }
                    // comfirm is not a function in react native, so we can use alert
                    Alert.alert(
                        "Confirm Deletion",
                        "Are you sure you want to delete your account?",
                        [
                            {
                                text: "Cancel",
                                style: "cancel"
                            },
                            {
                                text: "OK",
                                onPress: () => {
                                    deactivateAccount();
                                }
                            }
                        ]
                    );

                }}>
                    <Text style={styles.deleteText}>Delete account</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 20,
        paddingTop: 45,
        backgroundColor: 'rgba(255,255,255,0.9)', // 90% white, 10% transparent
        position: 'relative',
    },
    customeHr: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        marginLeft: '5%',
        height: 1,
        backgroundColor: '#ccc',
        width: '100%',
    },
    backText: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    headerTitle: {
        fontSize: 18,
        flex: 1,
        fontWeight: '600',
        paddingTop: 8,
        paddingInline: 15,
    },
    saveText: {
        color: 'blue',
        fontSize: 16,
        paddingEnd: 10,
        paddingTop: 8,
    },
    profileContainer: {
        alignItems: 'center',
        marginTop: 20,
        // borderWidth: 1,
        // borderColor: '#ccc',
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        backgroundColor: '#f0f0f0',
        overflow: 'hidden',
        marginInline: 'auto',
        position: 'relative',
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    formContainer: {
        paddingHorizontal: 20,
        marginTop: 20,
    },
    label: {
        fontSize: 12,
        color: '#999',
        marginBottom: 5,
        fontWeight: '500',
        textTransform: 'uppercase',
    },
    input: {
        borderWidth: 1,
        borderColor: 'rgb(137, 137, 137)',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginBottom: 20,
        borderStyle: 'dashed',
    },
    genderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    genderButton: {
        flex: 1,
        paddingVertical: 10,
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        alignItems: 'center',
    },
    selectedGender: {
        backgroundColor: 'black',
    },
    genderText: {
        color: '#000',
    },
    selectedGenderText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    buttonContainer: {
        marginTop: 30,
        alignItems: 'center',
    },
    logoutButton: {
        width: '90%',
        borderWidth: 1,
        borderColor: '#666',
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 8,
    },
    logoutText: {
        color: '#000',
        fontSize: 16,
    },
    deleteText: {
        color: 'red',
        fontSize: 16,
        marginTop: 25,
    },
});

// Removed duplicate export statement
