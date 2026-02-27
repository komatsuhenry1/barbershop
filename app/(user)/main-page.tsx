import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { BarbershopTheme } from '../../constants/BarbershopTheme';

// Mock Data
const UPCOMING_APPOINTMENTS = [
    {
        id: 1,
        service: 'Corte de Cabelo',
        barber: 'João Silva',
        date: '10/02/2026',
        time: '14:30',
        avatar: 'https://cdn.icon-icons.com/icons2/2643/PNG/512/avatar_male_man_people_person_profile_user_icon_159157.png'
    }
];

const SERVICES = [
    { id: 1, name: 'Corte', icon: '✂️' },
    { id: 2, name: 'Barba', icon: '🪒' },
    { id: 3, name: 'Cabelo + Barba', icon: '💈' },
    { id: 4, name: 'Sobrancelha', icon: '✏️' },
    { id: 5, name: 'Massagem', icon: '💆' },
];

const POPULAR_BARBERS = [
    { id: 1, name: 'João Silva', rating: 4.8, image: 'https://cdn.icon-icons.com/icons2/2643/PNG/512/avatar_male_man_people_person_profile_user_icon_159157.png' },
    { id: 2, name: 'Pedro Santos', rating: 4.9, image: 'https://cdn.icon-icons.com/icons2/2643/PNG/512/avatar_male_man_people_person_profile_user_icon_159157.png' },
    { id: 3, name: 'Carlos Oliveira', rating: 4.7, image: 'https://cdn.icon-icons.com/icons2/2643/PNG/512/avatar_male_man_people_person_profile_user_icon_159157.png' },
];

export default function MainPage() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.greeting}>Olá, Cliente</Text>
                        <Text style={styles.subGreeting}>Marque seu horário hoje</Text>
                    </View>
                    <TouchableOpacity onPress={() => router.push('/(user)/my-profile')}>
                        <Image
                            source={{ uri: 'https://cdn.icon-icons.com/icons2/2643/PNG/512/avatar_male_man_people_person_profile_user_icon_159157.png' }}
                            style={styles.profileImage}
                        />
                    </TouchableOpacity>
                </View>

                {/* Search */}
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Buscar serviços ou barbeiros..."
                        placeholderTextColor={BarbershopTheme.colors.textSecondary}
                    />
                </View>

                {/* Upcoming Appointment */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Próximo Agendamento</Text>
                    {UPCOMING_APPOINTMENTS.map(apt => (
                        <View key={apt.id} style={styles.appointmentCard}>
                            <View style={styles.appointmentInfo}>
                                <Text style={styles.appointmentService}>{apt.service}</Text>
                                <Text style={styles.appointmentBarber}>{apt.barber}</Text>
                                <Text style={styles.appointmentTime}>{apt.date} às {apt.time}</Text>
                            </View>
                            <View style={styles.avatarContainer}>
                                <Image source={{ uri: apt.avatar }} style={styles.barberAvatar} />
                            </View>
                        </View>
                    ))}
                </View>

                {/* Services */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Serviços</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
                        {SERVICES.map(service => (
                            <TouchableOpacity key={service.id} style={styles.serviceCard}>
                                <View style={styles.serviceIconContainer}>
                                    <Text style={styles.serviceIcon}>{service.icon}</Text>
                                </View>
                                <Text style={styles.serviceName}>{service.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Popular Barbers */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Barbeiros Populares</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
                        {POPULAR_BARBERS.map(barber => (
                            <View key={barber.id} style={styles.barberCard}>
                                <Image source={{ uri: barber.image }} style={styles.barberImage} />
                                <View style={styles.barberInfo}>
                                    <Text style={styles.barberName}>{barber.name}</Text>
                                    <Text style={styles.barberRating}>★ {barber.rating}</Text>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                </View>

            </ScrollView>

            {/* Floating Action Button for Scheduling */}
            <View style={styles.fabContainer}>
                <TouchableOpacity
                    style={styles.fab}
                    onPress={() => router.push('/(user)/schedule')}
                >
                    <Text style={styles.fabText}>+ Agendar</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BarbershopTheme.colors.background,
        paddingTop: 50,
    },
    scrollContent: {
        paddingBottom: 100,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: BarbershopTheme.spacing.l,
        marginBottom: 20,
    },
    greeting: {
        fontSize: 24,
        fontWeight: 'bold',
        color: BarbershopTheme.colors.text,
    },
    subGreeting: {
        fontSize: 16,
        color: BarbershopTheme.colors.textSecondary,
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: BarbershopTheme.colors.primary,
    },
    searchContainer: {
        paddingHorizontal: BarbershopTheme.spacing.l,
        marginBottom: 24,
    },
    searchInput: {
        backgroundColor: BarbershopTheme.colors.inputBackground,
        padding: 12,
        borderRadius: 12,
        color: BarbershopTheme.colors.text,
        borderWidth: 1,
        borderColor: BarbershopTheme.colors.border,
    },
    section: {
        marginBottom: 24,
        paddingHorizontal: BarbershopTheme.spacing.l,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: BarbershopTheme.colors.text,
        marginBottom: 12,
    },
    horizontalScroll: {
        flexDirection: 'row',
    },
    // Appointment Card
    appointmentCard: {
        backgroundColor: BarbershopTheme.colors.surface,
        borderRadius: 16,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderLeftWidth: 4,
        borderLeftColor: BarbershopTheme.colors.primary,
    },
    appointmentInfo: {
        flex: 1,
    },
    appointmentService: {
        color: BarbershopTheme.colors.primary,
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 4,
    },
    appointmentBarber: {
        color: BarbershopTheme.colors.text,
        fontSize: 14,
        marginBottom: 4,
    },
    appointmentTime: {
        color: BarbershopTheme.colors.textSecondary,
        fontSize: 12,
    },
    avatarContainer: {
        marginLeft: 10
    },
    barberAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: BarbershopTheme.colors.border
    },
    // Service Card
    serviceCard: {
        alignItems: 'center',
        marginRight: 16,
        width: 80,
    },
    serviceIconContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: BarbershopTheme.colors.surface,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        borderWidth: 1,
        borderColor: BarbershopTheme.colors.border,
    },
    serviceIcon: {
        fontSize: 24,
    },
    serviceName: {
        color: BarbershopTheme.colors.textSecondary,
        fontSize: 12,
        textAlign: 'center',
    },
    // Barber Card
    barberCard: {
        backgroundColor: BarbershopTheme.colors.surface,
        borderRadius: 16,
        marginRight: 16,
        width: 140,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: BarbershopTheme.colors.border,
    },
    barberImage: {
        width: '100%',
        height: 100,
        resizeMode: 'cover',
    },
    barberInfo: {
        padding: 10,
    },
    barberName: {
        color: BarbershopTheme.colors.text,
        fontWeight: 'bold',
        fontSize: 14,
        marginBottom: 4,
    },
    barberRating: {
        color: '#FFD700',
        fontSize: 12,
    },
    // FAB
    fabContainer: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    fab: {
        backgroundColor: BarbershopTheme.colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 24,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    fabText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    }
});