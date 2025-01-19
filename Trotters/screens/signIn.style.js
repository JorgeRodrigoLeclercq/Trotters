import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, SIZES } from '../resources';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: 'transparent' 
    },
    gradientBackground: {
        ...StyleSheet.absoluteFillObject
    },
    logoAndMottoContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: 300,
        height: 54.3030300105
    },
    motto: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: SIZES.large,
        color: COLORS.white,
        marginTop: 4
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export const GradientBackground = ({ children }) => (
    <LinearGradient
        colors={[COLORS.secondary, COLORS.primary]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        locations={[0.1, 1]}
        style={styles.gradientBackground}
    >
        
        {children}
    </LinearGradient>
);

export default styles;