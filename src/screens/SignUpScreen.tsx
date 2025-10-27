import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../theme';
import { useAuth } from '../context/AuthContext';

export default function SignUpScreen() {
  const navigation = useNavigation();
  const { signUp } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthdate: '',
    town: '',
    region: '',
    postalCode: '',
    homeAddress: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const tunisianTowns = [
    { name: 'Tunis', region: 'Tunis' },
    { name: 'Ariana', region: 'Ariana' },
    { name: 'Ben Arous', region: 'Ben Arous' },
    { name: 'Manouba', region: 'Manouba' },
    { name: 'Sfax', region: 'Sfax' },
    { name: 'Sousse', region: 'Sousse' },
    { name: 'Kairouan', region: 'Kairouan' },
    { name: 'Bizerte', region: 'Bizerte' },
    { name: 'Gabès', region: 'Gabès' },
    { name: 'Nabeul', region: 'Nabeul' },
  ];

  const updateFormData = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (key === 'town') {
      const selectedTown = tunisianTowns.find((t) => t.name === value);
      if (selectedTown) {
        setFormData((prev) => ({ ...prev, region: selectedTown.region }));
      }
    }
  };

  const validateStep1 = () => {
    if (!formData.fullName.trim()) {
      Alert.alert('Error', 'Please enter your full name');
      return false;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email');
      return false;
    }
    if (formData.password.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return false;
    }
    if (!formData.birthdate) {
      Alert.alert('Error', 'Please enter your birthdate');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.town) {
      Alert.alert('Error', 'Please select your town');
      return false;
    }
    if (!formData.postalCode) {
      Alert.alert('Error', 'Please enter your postal code');
      return false;
    }
    if (!formData.homeAddress.trim()) {
      Alert.alert('Error', 'Please enter your home address');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleSignUp = async () => {
    if (!validateStep2()) return;

    setLoading(true);
    const { error } = await signUp(
      formData.email,
      formData.password,
      formData.fullName,
      {
        birthdate: formData.birthdate,
        town: formData.town,
        region: formData.region,
        postal_code: formData.postalCode,
        home_address: formData.homeAddress,
      } as any
    );

    if (error) {
      setLoading(false);
      Alert.alert('Signup Failed', error.message);
      return;
    }

    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => (step === 1 ? navigation.goBack() : setStep(1))}
          >
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.stepIndicator}>Step {step} of 2</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              {step === 1 ? 'Create Account' : 'Address Information'}
            </Text>
            <Text style={styles.subtitle}>
              {step === 1
                ? 'Join Dawwar and start recycling'
                : 'Help us find nearby recycling centers'}
            </Text>
          </View>

          {step === 1 ? (
            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Full Name</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="person-outline" size={20} color={colors.textSecondary} />
                  <TextInput
                    style={styles.input}
                    placeholder="John Doe"
                    placeholderTextColor={colors.textLight}
                    value={formData.fullName}
                    onChangeText={(text) => updateFormData('fullName', text)}
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="mail-outline" size={20} color={colors.textSecondary} />
                  <TextInput
                    style={styles.input}
                    placeholder="your.email@example.com"
                    placeholderTextColor={colors.textLight}
                    value={formData.email}
                    onChangeText={(text) => updateFormData('email', text)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Password (min 8 characters)</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="lock-closed-outline" size={20} color={colors.textSecondary} />
                  <TextInput
                    style={styles.input}
                    placeholder="Create a password"
                    placeholderTextColor={colors.textLight}
                    value={formData.password}
                    onChangeText={(text) => updateFormData('password', text)}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons
                      name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                      size={20}
                      color={colors.textSecondary}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Confirm Password</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="lock-closed-outline" size={20} color={colors.textSecondary} />
                  <TextInput
                    style={styles.input}
                    placeholder="Confirm your password"
                    placeholderTextColor={colors.textLight}
                    value={formData.confirmPassword}
                    onChangeText={(text) => updateFormData('confirmPassword', text)}
                    secureTextEntry={!showConfirmPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                    <Ionicons
                      name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                      size={20}
                      color={colors.textSecondary}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Birthdate (YYYY-MM-DD)</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="calendar-outline" size={20} color={colors.textSecondary} />
                  <TextInput
                    style={styles.input}
                    placeholder="1990-01-15"
                    placeholderTextColor={colors.textLight}
                    value={formData.birthdate}
                    onChangeText={(text) => updateFormData('birthdate', text)}
                  />
                </View>
              </View>

              <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                <Text style={styles.nextButtonText}>Next</Text>
                <Ionicons name="arrow-forward" size={20} color={colors.textWhite} />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Town</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="location-outline" size={20} color={colors.textSecondary} />
                  <TextInput
                    style={styles.input}
                    placeholder="Select your town"
                    placeholderTextColor={colors.textLight}
                    value={formData.town}
                    onChangeText={(text) => updateFormData('town', text)}
                  />
                </View>
                <Text style={styles.hint}>e.g., Tunis, Sfax, Sousse</Text>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Region (Auto-filled)</Text>
                <View style={[styles.inputWrapper, styles.inputDisabled]}>
                  <Ionicons name="map-outline" size={20} color={colors.textSecondary} />
                  <TextInput
                    style={styles.input}
                    value={formData.region}
                    editable={false}
                    placeholderTextColor={colors.textLight}
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Postal Code</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="mail-outline" size={20} color={colors.textSecondary} />
                  <TextInput
                    style={styles.input}
                    placeholder="1000"
                    placeholderTextColor={colors.textLight}
                    value={formData.postalCode}
                    onChangeText={(text) => updateFormData('postalCode', text)}
                    keyboardType="numeric"
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Home Address</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="home-outline" size={20} color={colors.textSecondary} />
                  <TextInput
                    style={styles.input}
                    placeholder="Street name and number"
                    placeholderTextColor={colors.textLight}
                    value={formData.homeAddress}
                    onChangeText={(text) => updateFormData('homeAddress', text)}
                  />
                </View>
              </View>

              <TouchableOpacity
                style={styles.nextButton}
                onPress={handleSignUp}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color={colors.textWhite} />
                ) : (
                  <>
                    <Text style={styles.nextButtonText}>Complete Signup</Text>
                    <Ionicons name="checkmark" size={20} color={colors.textWhite} />
                  </>
                )}
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity
            style={styles.loginLink}
            onPress={() => navigation.navigate('Login' as never)}
          >
            <Text style={styles.loginLinkText}>
              Already have an account? <Text style={styles.loginLinkBold}>Log In</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepIndicator: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.primary,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
  },
  titleContainer: {
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
  },
  form: {
    gap: spacing.md,
  },
  inputContainer: {
    gap: spacing.xs,
  },
  label: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    borderWidth: 2,
    borderColor: colors.border,
    gap: spacing.sm,
  },
  inputDisabled: {
    opacity: 0.6,
  },
  input: {
    flex: 1,
    paddingVertical: spacing.md,
    fontSize: typography.fontSize.md,
    color: colors.text,
  },
  hint: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  nextButton: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: spacing.lg,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  nextButtonText: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
    color: colors.textWhite,
  },
  loginLink: {
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginTop: spacing.md,
  },
  loginLinkText: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  loginLinkBold: {
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
  },
});
