import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Button, StyleSheet, Text, View } from "react-native";
import { api } from "../../services/api";

interface DashboardData {
    total_schedules: number;
    pending_schedules: number;
    completed_schedules: number;
    cancelled_schedules: number;
}

export default function AdminDashboard() {
    const router = useRouter();
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const storage = AsyncStorage;

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {
        try {
            const token = await storage.getItem('token');
            setLoading(true);
            const response = await api.getDashboard(token);
            console.log("Dashboard data:", response);
            setData(response);
            setError(null);
        } catch (err) {
            console.error("Error fetching dashboard:", err);
            setError("Falha ao carregar os dados do dashboard.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>ADMIN Dashboard</Text>
                <Button
                    title="Sair"
                    onPress={async () => {
                        await storage.removeItem('token');
                        router.replace('/(auth)/login');
                    }}
                />
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
            ) : error ? (
                <Text style={styles.errorText}>{error}</Text>
            ) : data ? (
                <View style={styles.cardsContainer}>
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Total</Text>
                        <Text style={styles.cardValue}>{data.total_schedules}</Text>
                    </View>
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Pendentes</Text>
                        <Text style={styles.cardValue}>{data.pending_schedules}</Text>
                    </View>
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Concluídos</Text>
                        <Text style={styles.cardValue}>{data.completed_schedules}</Text>
                    </View>
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Cancelados</Text>
                        <Text style={styles.cardValue}>{data.cancelled_schedules}</Text>
                    </View>
                    <Button
                        title="Manage users"
                        onPress={() => {
                            router.push('/(admin)/users');
                        }}
                    />
                </View>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
        marginTop: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    loader: {
        marginTop: 50,
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 50,
    },
    cardsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        width: '48%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        marginBottom: 15,
        elevation: 3, // for android shadow
        shadowColor: '#000', // for ios shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        alignItems: 'center',
    },
    cardTitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 10,
        textAlign: 'center',
    },
    cardValue: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
    },
});