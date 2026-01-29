import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { BarbershopTheme } from '../../constants/BarbershopTheme';
import { api } from '../../services/api';

export default function RegisterScreen() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        cpf: '',
        password: '',
        avatar_url: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (key: string, value: string) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleRegister = async () => {
        // Basic validation
        if (!formData.name || !formData.email || !formData.cpf || !formData.password) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        setLoading(true);
        try {
            const response = await api.register(formData);
            console.log('Registration successful:', response);
            Alert.alert('Sucesso', 'Conta criada com sucesso!', [
                { text: 'OK', onPress: () => router.replace('/login') }
            ]);
        } catch (error) {
            console.error('Registration error:', error);
            Alert.alert('Erro', 'Falha ao criar conta. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Crie sua conta</Text>
                    <Text style={styles.subtitle}>Junte-se ao BarberShop</Text>
                </View>

                <View style={styles.form}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Nome Completo</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Ex: João Silva"
                            placeholderTextColor={BarbershopTheme.colors.textSecondary}
                            value={formData.name}
                            onChangeText={(t) => handleChange('name', t)}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="seu@email.com"
                            placeholderTextColor={BarbershopTheme.colors.textSecondary}
                            value={formData.email}
                            onChangeText={(t) => handleChange('email', t)}
                            autoCapitalize="none"
                            keyboardType="email-address"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>CPF</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="000.000.000-00"
                            placeholderTextColor={BarbershopTheme.colors.textSecondary}
                            value={formData.cpf}
                            onChangeText={(t) => handleChange('cpf', t)}
                            keyboardType="numeric"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Senha</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="********"
                            placeholderTextColor={BarbershopTheme.colors.textSecondary}
                            value={formData.password}
                            onChangeText={(t) => handleChange('password', t)}
                            secureTextEntry
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Avatar URL (Opcional)</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="https://exemplo.com/foto.jpg"
                            placeholderTextColor={BarbershopTheme.colors.textSecondary}
                            value={formData.avatar_url}
                            onChangeText={(t) => handleChange('avatar_url', t)}
                            autoCapitalize="none"
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleRegister}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#FFF" />
                        ) : (
                            <Text style={styles.buttonText}>Registrar</Text>
                        )}
                    </TouchableOpacity>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Já tem uma conta? </Text>
                        <Link href="/login" asChild>
                            <TouchableOpacity>
                                <Text style={styles.link}>Entrar</Text>
                            </TouchableOpacity>
                        </Link>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: BarbershopTheme.colors.background,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: BarbershopTheme.spacing.l,
        paddingTop: 60,
        paddingBottom: 40,
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: BarbershopTheme.colors.primary,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: BarbershopTheme.colors.textSecondary,
    },
    form: {
        gap: 16,
    },
    inputContainer: {
        gap: 8,
    },
    label: {
        color: BarbershopTheme.colors.text,
        fontSize: 14,
        fontWeight: '600',
    },
    input: {
        backgroundColor: BarbershopTheme.colors.inputBackground,
        color: BarbershopTheme.colors.text,
        padding: 16,
        borderRadius: BarbershopTheme.borderRadius.m,
        borderWidth: 1,
        borderColor: BarbershopTheme.colors.border,
    },
    button: {
        backgroundColor: BarbershopTheme.colors.primary,
        padding: 16,
        borderRadius: BarbershopTheme.borderRadius.m,
        alignItems: 'center',
        marginTop: 16,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 16,
    },
    footerText: {
        color: BarbershopTheme.colors.textSecondary,
    },
    link: {
        color: BarbershopTheme.colors.primary,
        fontWeight: 'bold',
    },
});
