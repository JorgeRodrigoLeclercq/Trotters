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
    },

    
    getCSAEPolicy: (req, res) => {
        res.status(200).send(`
            <h1>Zero Tolerance for CSAE (Child Sexual Abuse and Exploitation)</h1>
            <p>At Trotters, we have a strict zero-tolerance policy towards any form of Child Sexual Abuse and Exploitation (CSAE). CSAE refers to any content, behavior, or action that sexually exploits, abuses, or endangers children. This policy applies to all users and all forms of interaction on our platform. We are committed to protecting the safety and well-being of minors, and we will take immediate and firm action against any violation of this policy.</p>
            
            <h2>What is CSAE?</h2>
            <p>CSAE refers to any act or content that involves the sexual abuse, exploitation, or endangerment of children. This includes, but is not limited to:</p>
            <ul>
                <li><strong>Grooming a child for sexual exploitation:</strong> Any attempt to establish a relationship with a minor to manipulate or coerce them into sexual activities.</li>
                <li><strong>Sextortion of a child:</strong> The act of coercing or threatening a child with intimate content to exploit or manipulate them for sexual purposes.</li>
                <li><strong>Trafficking a child for sex:</strong> Any involvement in the transportation or exploitation of a minor for the purpose of sex or sexual exploitation.</li>
                <li><strong>Creation, possession, or distribution of child sexual abuse material:</strong> Any content that depicts the sexual abuse or exploitation of children, including photos, videos, or live streaming.</li>
                <li><strong>Any other behavior that sexually exploits or endangers children:</strong> This includes online interactions, chat activities, or any form of communication used to manipulate, harm, or exploit minors sexually.</li>
            </ul>

            <h2>Our Commitment to Protecting Children</h2>
            <p>We are fully committed to ensuring that Trotters remains a safe space for all users, especially minors. We have implemented several safeguards to prevent CSAE on our platform:</p>
            <ul>
                <li><strong>Active Monitoring:</strong> We actively monitor user activity for any signs of inappropriate behavior. Our team is trained to spot and address potential CSAE threats.</li>
                <li><strong>Reporting Mechanisms:</strong> We provide a clear and easy way for users to report suspected CSAE. If you suspect any CSAE behavior, please contact us immediately so we can take action.</li>
                <li><strong>Cooperation with Authorities:</strong> We will fully cooperate with law enforcement agencies and report any CSAE incidents or threats. We have a legal obligation to report suspected abuse or exploitation.</li>
                <li><strong>User Education:</strong> We work to educate our users about the dangers of CSAE and encourage everyone to be vigilant and responsible when interacting online.</li>
            </ul>

            <h2>Consequences of CSAE Violations</h2>
            <p>Any user found to be involved in CSAE will face immediate and severe consequences. These include:</p>
            <ul>
                <li><strong>Account Termination:</strong> Any account found to be engaging in CSAE will be permanently banned from the platform.</li>
                <li><strong>Reporting to Authorities:</strong> We will immediately report any CSAE incident to the relevant law enforcement agencies for further investigation and legal action.</li>
                <li><strong>Legal Action:</strong> In cases where CSAE is identified, we will assist authorities in the legal proceedings and ensure that appropriate action is taken against offenders.</li>
            </ul>

            <h2>Our Promise</h2>
            <p>We take the safety of children seriously, and we will not tolerate any form of CSAE on our platform. We are committed to doing everything within our power to prevent these heinous acts and to ensure that Trotters remains a safe and secure environment for all users.</p>
            <p>If you suspect any form of CSAE, please report it immediately to us at <a href="mailto:support@trottersapp.com">support@trottersapp.com</a>. We will investigate every report thoroughly and take the necessary actions to protect children from harm.</p>
            <p>We encourage our users to educate themselves about the risks and signs of CSAE and to remain vigilant. Together, we can work towards a safer, more responsible online community.</p>
        `);
    }   
};