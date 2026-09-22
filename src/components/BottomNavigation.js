import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function BottomNavigation({ activeTab, onTabPress }) {
  const tabs = [
    { id: 'home', label: 'Início', icon: 'home' },
    { id: 'favorites', label: 'Favoritos', icon: 'heart' },
    { id: 'profile', label: 'Perfil', icon: 'user' },
  ];

  return (
    <View style={styles.bottomNavContainer}>
      <View style={styles.bottomNav}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              style={[styles.navItem, isActive && styles.navItemActive]}
              onPress={() => onTabPress(tab.id)}
              activeOpacity={0.7}
            >
              <Feather
                name={tab.icon}
                size={20}
                color={isActive ? '#4F46E5' : '#94A3B8'}
              />
              <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>
                {tab.label}
              </Text>
              
              {/* Indicador visual superior na aba ativa */}
              {isActive && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNavContainer: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 8,
  },
  bottomNav: {
    flexDirection: 'row',
    justify: 'space-around',
    alignItems: 'center',
    height: 64,
    paddingHorizontal: 16,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justify: 'center',
    paddingVertical: 8,
    position: 'relative',
    borderRadius: 12,
  },
  navItemActive: {
    backgroundColor: '#EEF2FF',
  },
  navLabel: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 3,
    fontWeight: '500',
  },
  navLabelActive: {
    color: '#4F46E5',
    fontWeight: '700',
  },
  activeIndicator: {
    position: 'absolute',
    top: 0,
    width: 24,
    height: 3,
    backgroundColor: '#4F46E5',
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  },
});