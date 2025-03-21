import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

// Import the image from the assets folder
import LocalImage from '../assets/images/content2.jpg';

const HomeScreen = () => {
  const [menuOpen, setMenuOpen] = useState(false); // State for menu visibility
  const navigation = useNavigation(); // Hook for navigation

  const navigateToProfile = () => {
    setMenuOpen(false); // Close menu toggle
    navigation.navigate('Profile'); // Navigate to Profile screen
  };

  const navigateToCheck = () => {
    setMenuOpen(false); // Close menu toggle
    navigation.navigate('check'); // Navigate to Profile screen
  };

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.scrollContainer}
    >
      {/* Header with Menu and Search */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setMenuOpen(!menuOpen)} style={styles.menuButton}>
          <Feather name="menu" size={28} color="white" />
        </TouchableOpacity>
        <View style={styles.searchBar}>
          <TextInput 
            placeholder="WHAT ARE YOU FOR ?" 
            style={styles.searchInput} 
            placeholderTextColor="gray"
          />
          <Feather name="search" size={20} color="gray" style={styles.searchIcon} />
        </View>
      </View>

      {/* Dropdown Menu */}
      {menuOpen && (
        <View style={styles.dropdownMenu}>
          <TouchableOpacity onPress={() => setMenuOpen(false)}>
            <Text style={styles.menuItem}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateToProfile}>
            <Text style={styles.menuItem}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateToCheck}>
            <Text style={styles.menuItem}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.menuItem}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Service Categories */}
      <ScrollView 
        horizontal={true} 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.categoryContainer}
      >
        <TouchableOpacity style={styles.categoryButton}>
          <Text style={styles.categoryText}>PLUMBER</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryButton}>
          <Text style={styles.categoryText}>TUTORER</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryButton}>
          <Text style={styles.categoryText}>CONSTRUCTOR 
            
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryButton}>
          <Text style={styles.categoryText}>CLEANER</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryButton}>
          <Text style={styles.categoryText}>GARDENER</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Image Section */}
      <Image 
        source={LocalImage} 
        style={styles.serviceImage} 
      />

      {/* Booking Button */}
      <TouchableOpacity style={styles.bookButton}>
        <Text style={styles.bookButtonText}>BOOK A SERVICE</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#2D2D2D' 
  },
  scrollContainer: {
    flexGrow: 1, // Ensures scrolling is calculated properly
    padding: 20,
  },
  header: { 
    position: 'relative', 
    marginBottom: 20 
  },
  menuButton: { 
    marginTop: 10,
    zIndex: 10 
  },
  searchBar: { 
    flexDirection: 'row', 
    backgroundColor: 'white', 
    borderRadius: 10, 
    marginTop: 5,
    padding: 10 
  },
  searchInput: { 
    flex: 1 
  },
  searchIcon: { 
    marginLeft: 5 
  },
  dropdownMenu: {
    position: 'absolute',
    top: 60, 
    left: 0, 
    right: 0, 
    backgroundColor: '#444', 
    padding: 10, 
    borderRadius: 10,
    zIndex: 100, // Ensure it appears above other components
  },
  menuItem: { 
    color: 'white', 
    fontSize: 16, 
    marginVertical: 5 
  },
  categoryContainer: { 
    flexDirection: 'row', 
    paddingHorizontal: 5,
    alignItems: 'center' 
  },
  categoryButton: { 
    backgroundColor: '#00A2FF', 
    paddingVertical: 30, 
    paddingHorizontal: 7, 
    borderRadius: 10, 
    alignItems: 'center', 
    marginHorizontal: 5 
  },
  categoryText: { 
    color: 'white', 
    fontWeight: 'bold' 
  },
  serviceImage: { 
    width: '100%', 
    height: 250, 
    borderRadius: 10, 
    marginBottom: 20,
    marginTop: 20,
  },
  bookButton: { 
    backgroundColor: '#00A2FF', 
    padding: 15, 
    borderRadius: 10, 
    alignItems: 'center' 
  },
  bookButtonText: { 
    color: 'white', 
    fontWeight: 'bold', 
    fontSize: 16 
  }
});

export default HomeScreen;
