module.exports = {
    getMainScreen: (req, res) => {
        res.status(200).send(`
            <h1>Welcome to the Trotters App</h1>
            <p>Click here to read our <a href="/privacy-policy">Privacy Policy</a></p>
            
            <p>Trotters is a mobile app whose purpose is to help connect people who share interests when traveling. For instance, meeting Jazz Fusion enthusiasts when visiting Japan!</p>
            <p>It has been developed by Jorge Rodrigo Leclercq, individually and without profit.</p>
            
            <p>The frontend is programmed with React Native and the backend with Node.js, which is hosted in an AWS Elastic Beanstalk server and uses MongoDB as a database.</p>
        
            <h2>Use of Google OAuth</h2>
            <p>Trotters uses Google's OAuth to authenticate users securely when signing in. The only information accessed is the user’s email, which is used solely for authentication purposes and is not shared with third parties.</p>
            <p>This authentication method ensures a secure and seamless login experience while protecting user data.</p>
            
            <p>The app is available for Android devices.</p>
        `);        
    },

    getPrivacyPolicy: (req, res) => {
        res.status(200).send(`
            <h1>Privacy Policy</h1>
    
            <p><strong>Effective Date:</strong> 01/02/2025</p>
    
            <h2>1. Introduction</h2>
            <p>Welcome to Trotters. Your privacy is important to us, and we are committed to protecting the information you share with us. This Privacy Policy explains how we collect, use, and safeguard your information when you use our application.</p>
    
            <h2>2. Information We Collect</h2>
            <p>We only collect and process the following personal information:</p>
            <ul>
                <li><strong>Email Address:</strong> We collect your email address exclusively for authentication and account management purposes.</li>
            </ul>
    
            <h2>3. How We Use Your Information</h2>
            <p>We use your email address solely for the following purposes:</p>
            <ul>
                <li>Allowing you to sign up and log in to your account securely.</li>
                <li>Providing account-related notifications and updates.</li>
                <li>Managing and maintaining your account.</li>
            </ul>
            <p>We do not share, sell, or distribute your email address to any third parties.</p>
    
            <h2>4. Data Security</h2>
            <p>We implement appropriate security measures to protect your information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or method of electronic storage is 100% secure, and we cannot guarantee absolute security.</p>
    
            <h2>5. Third-Party Services</h2>
            <p>Our app may integrate with third-party authentication providers, such as Google Sign-In. These services have their own privacy policies, and we encourage you to review them to understand how your data is handled by these third parties.</p>
    
            <h2>6. Your Rights and Choices</h2>
            <p>You have the right to:</p>
            <ul>
                <li>Access, update, or delete your account information.</li>
                <li>Withdraw consent for us to process your data by deleting your account.</li>
                <li>Contact us for any inquiries related to your data privacy.</li>
            </ul>
    
            <h2>7. Changes to This Privacy Policy</h2>
            <p>We may update this Privacy Policy from time to time. Any changes will be posted within the app, and we encourage you to review this policy periodically.</p>
    
            <h2>8. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy or your data privacy, please contact us at <a href="mailto:wearetrotters@gmail.com">wearetrotters@gmail.com</a>.</p>
        `);
    },    

    getHealthCheck: (req, res) => {
        res.status(200).send('OK');
    }
};