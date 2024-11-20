// pages/privacy-policy.js

// data/privacyPolicyData.js

export const privacyPolicyData = {
    lastUpdated: "November 2024",
    sections: [
        {
            title: "Information We Collect",
            content: "We collect the following types of information when you use our services:",
            list: [
                "Personal Information: When you sign up for an account or use our services, we collect your name, email address, phone number, and other business details.",
                "Business Information: This includes your business name, business address, GST number, PAN number, and other related business details to enable invoicing and tax calculations.",
                "Payment Information: When you process payments or use our billing services, we collect billing details necessary to process payments securely.",
                "Usage Data: We collect information about how you interact with our platform, including device information, browser type, and pages viewed.",
            ],
        },
        {
            title: "How We Use Your Information",
            content: "We use the information we collect for the following purposes:",
            list: [
                "To Provide Our Services: We use your personal and business information to enable the creation of invoices, process payments, and perform accounting tasks.",
                "To Improve Our Services: Usage data helps us understand how users interact with our platform, allowing us to improve the app's functionality and user experience.",
                "For Legal and Compliance Purposes: Your GST and PAN numbers may be required for tax reporting and other regulatory purposes.",
                "To Communicate with You: We may use your contact information to send service-related updates, promotional offers, or other relevant information about our services.",
            ],
        },
        {
            title: "Data Security",
            content: "We implement reasonable security measures to protect your personal and business information from unauthorized access, alteration, or deletion. However, no method of data transmission over the internet is completely secure. While we strive to protect your personal information, we cannot guarantee its absolute security.",
        },
        {
            title: "Sharing Your Information",
            content: "We do not sell, rent, or share your personal data with third parties for marketing purposes. However, we may share your information in the following circumstances:",
            list: [
                "With Service Providers: We may share your data with trusted third-party providers who help us operate our services, process payments, or maintain our platform.",
                "For Legal Reasons: We may disclose your information if required by law or to comply with legal obligations, court orders, or government requests.",
            ],
        },
        {
            title: "Your Rights",
            content: "You have the following rights regarding your personal data:",
            list: [
                "Access: You can request access to the personal data we hold about you.",
                "Correction: You can update or correct your personal and business information at any time.",
                "Deletion: You can request that we delete your personal data, subject to certain exceptions, such as legal obligations.",
                "Data Portability: You have the right to request a copy of your data in a machine-readable format.",
            ],
            note: "To exercise these rights, please contact us at support@strixinvoice.com.",
        },
        {
            title: "Cookies and Tracking Technologies",
            content: "We use cookies and similar tracking technologies to improve your experience on our platform. These tools help us analyze user behavior and personalize your experience. You can manage your cookie preferences through your browser settings.",
        },
        {
            title: "Third-Party Links",
            content: "Our app may contain links to third-party websites or services that are not operated by us. We have no control over and assume no responsibility for the content, privacy policies, or practices of third-party sites. We encourage you to review the privacy policies of any external sites you visit.",
        },
        {
            title: "Changes to This Privacy Policy",
            content: "We may update this Privacy Policy from time to time. Any changes will be posted on this page, and the updated date will be indicated at the top of the page. We recommend reviewing this policy periodically to stay informed about how we are protecting your information.",
        },
        {
            title: "Contact Us",
            content: "If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:",
            list: [
                "Email: support@strixinvoice.com",
                "Business Address: #129 Pb Road Davanagere Karnataka India 577002",
            ],
        },
    ],
};

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen  px-2 md:px-44">
            <div className="bg-white py-6">
                <h1 className="text-3xl font-semibold text-gray-800 mb-6">Privacy Policy</h1>
                <p className="text-gray-700 text-lg mb-6">
                    <strong>Last Updated: {privacyPolicyData.lastUpdated}</strong>
                </p>

                <div className="space-y-6">
                    {privacyPolicyData.sections.map((section, index) => (
                        <section key={index}>
                            <h2 className="text-2xl font-semibold text-gray-800">{section.title}</h2>
                            <p className="text-gray-700">{section.content}</p>
                            {section.list && (
                                <ul className="list-disc pl-6 space-y-2">
                                    {section.list.map((item, idx) => (
                                        <li key={idx} className="text-gray-700">{item}</li>
                                    ))}
                                </ul>
                            )}
                            {section.note && <p className="text-gray-700 italic">{section.note}</p>}
                        </section>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
