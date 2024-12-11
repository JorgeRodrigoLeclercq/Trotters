import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, SIZES } from '../resources';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: 'transparent', // Required for gradient
    },
    gradientBackground: {
        ...StyleSheet.absoluteFillObject, // Fills the container
    },
    logoContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        fontFamily: 'Poppins-Bold',
        fontSize: SIZES.xxLarge,
        color: COLORS.white
    },
    motto: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: SIZES.large,
        color: COLORS.white
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

// Export GradientBackground component as a named export
export const GradientBackground = ({ children }) => (
    <LinearGradient
        colors={[COLORS.tertiary, COLORS.primary]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        locations={[0.1, 1]}
        style={styles.gradientBackground}
    >
        {children}
    </LinearGradient>
);

export default styles;