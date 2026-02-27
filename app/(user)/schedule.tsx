import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { BarbershopTheme } from '../../constants/BarbershopTheme';
import { api } from '../../services/api';

export default function ScheduleScreen() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        user_id: '1', // Hardcoded for now as per example/MVP
        service_id: '3',
        service_name: 'Corte de Cabelo',
        barber_id: '5',
        barber_name: 'João Silva',
        date: '2026-02-10',
        time: '14:30',
        status: 'scheduled'
    });

    const handleChange = (key: string, value: string) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleSchedule = async () => {
        setLoading(true);
        try {
            const payload = {
                ...formData,
                user_id: parseInt(formData.user_id),
                service_id: parseInt(formData.service_id),
                barber_id: parseInt(formData.barber_id),
            };

            const response = await api.schedule(payload);
            console.log('Scheduling response:', response);

            if (response.success === false) {
                Alert.alert('Erro', response.message || 'Falha ao agendar.');
                return;
            }

            Alert.alert('Sucesso', 'Agendamento realizado com sucesso!', [
                { text: 'OK', onPress: () => router.back() }
            ]);

        } catch (error) {
            console.error('Scheduling error:', error);
            Alert.alert('Erro', 'Falha ao realizar agendamento.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Agendar Horário</Text>
                </View>

                <View style={styles.form}>
                    {/* User ID - Hidden/Readonly for now */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>ID do Usuário</Text>
                        <TextInput
                            style={[styles.input, styles.disabledInput]}
                            value={formData.user_id}
                            editable={false}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Serviço (ID)</Text>
                        <TextInput
                            style={styles.input}
                            value={formData.service_id}
                            onChangeText={(t) => handleChange('service_id', t)}
                            keyboardType="numeric"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Nome do Serviço</Text>
                        <TextInput
                            style={styles.input}
                            value={formData.service_name}
                            onChangeText={(t) => handleChange('service_name', t)}
                        />
                    </View>


                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Barbeiro (ID)</Text>
                        <TextInput
                            style={styles.input}
                            value={formData.barber_id}
                            onChangeText={(t) => handleChange('barber_id', t)}
                            keyboardType="numeric"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Nome do Barbeiro</Text>
                        <TextInput
                            style={styles.input}
                            value={formData.barber_name}
                            onChangeText={(t) => handleChange('barber_name', t)}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Data (YYYY-MM-DD)</Text>
                        <TextInput
                            style={styles.input}
                            value={formData.date}
                            onChangeText={(t) => handleChange('date', t)}
                            placeholder="2026-02-10"
                            placeholderTextColor={BarbershopTheme.colors.textSecondary}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Hora (HH:MM)</Text>
                        <TextInput
                            style={styles.input}
                            value={formData.time}
                            onChangeText={(t) => handleChange('time', t)}
                            placeholder="14:30"
                            placeholderTextColor={BarbershopTheme.colors.textSecondary}
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleSchedule}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#FFF" />
                        ) : (
                            <Text style={styles.buttonText}>Confirmar Agendamento</Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, styles.secondaryButton]}
                        onPress={() => router.back()}
                        disabled={loading}
                    >
                        <Text style={styles.secondaryButtonText}>Cancelar</Text>
                    </TouchableOpacity>
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
        padding: BarbershopTheme.spacing.l,
    },
    header: {
        alignItems: 'center',
        marginBottom: 30,
        marginTop: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: BarbershopTheme.colors.primary,
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
    disabledInput: {
        opacity: 0.7,
        backgroundColor: '#e0e0e0',
    },
    button: {
        backgroundColor: BarbershopTheme.colors.primary,
        padding: 16,
        borderRadius: BarbershopTheme.borderRadius.m,
        alignItems: 'center',
        marginTop: 16,
    },
    secondaryButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: BarbershopTheme.colors.primary,
        marginTop: 8,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    secondaryButtonText: {
        color: BarbershopTheme.colors.primary,
        fontSize: 16,
        fontWeight: 'bold',
    },
});
