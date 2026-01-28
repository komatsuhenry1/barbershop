import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { BarbershopTheme } from '../constants/BarbershopTheme';
import { api } from '../services/api';

export default function LoginScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }

        setLoading(true);
        try {
            const response = await api.login(email, password);
            console.log('Login successful:', response);
            // TODO: Save token/user info
            router.replace('/(tabs)'); // Navigate to main app
        } catch (error) {
            console.error('Login error:', error);
            Alert.alert('Erro', 'Falha ao realizar login. Verifique suas credenciais.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>BarberShop</Text>
                <Text style={styles.subtitle}>Bem-vindo de volta</Text>
            </View>

            <View style={styles.form}>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="seu@email.com"
                        placeholderTextColor={BarbershopTheme.colors.textSecondary}
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Senha</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="********"
                        placeholderTextColor={BarbershopTheme.colors.textSecondary}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleLogin}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#FFF" />
                    ) : (
                        <Text style={styles.buttonText}>Entrar</Text>
                    )}
                </TouchableOpacity>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Não tem uma conta? </Text>
                    <Link href="/register" asChild>
                        <TouchableOpacity>
                            <Text style={styles.link}>Registre-se</Text>
                        </TouchableOpacity>
                    </Link>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BarbershopTheme.colors.background,
        justifyContent: 'center',
        padding: BarbershopTheme.spacing.l,
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: BarbershopTheme.colors.primary,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: BarbershopTheme.colors.textSecondary,
    },
    form: {
        gap: 20,
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
        marginTop: 8,
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
