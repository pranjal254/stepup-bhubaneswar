# Step Up Bhubaneswar - Dance Workshop Platform

A beautiful, modern web application for Odisha's first curated dance workshop platform. Built with Next.js, Tailwind CSS, and designed for the new generation with sleek aesthetics.

## 🚀 Features

- **Modern Design**: Clean, sleek interface inspired by contemporary design trends
- **Responsive**: Fully responsive design that works on all devices
- **Workshop Management**: Display upcoming workshops with countdown timers
- **Registration System**: Multi-step registration form with payment integration
- **Gallery**: Showcase workshop highlights, reels, and behind-the-scenes content
- **Contact Integration**: WhatsApp and email integration for seamless communication
- **Slot Management**: Real-time slot availability and "filling fast" indicators

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Language**: JavaScript (no TypeScript)
- **Payment**: UPI integration with screenshot verification

## 📁 Project Structure

```
stepup-bhubaneswar/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.js
│   │   ├── page.js
│   │   ├── about/page.js
│   │   ├── workshops/page.js
│   │   ├── gallery/page.js
│   │   ├── register/page.js
│   │   └── contact/page.js
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   │   ├── Header.js
│   │   │   └── Footer.js
│   │   ├── sections/
│   │   │   ├── Hero.js
│   │   │   ├── About.js
│   │   │   ├── Workshops.js
│   │   │   ├── Gallery.js
│   │   │   └── Contact.js
│   │   └── forms/
│   │       └── RegistrationForm.js
│   └── lib/
├── public/
├── tailwind.config.js
├── next.config.js
└── package.json
```

## 🚦 Getting Started

1. **Clone and Setup**
   ```bash
   npx create-next-app@latest stepup-bhubaneswar --tailwind --eslint --app --src-dir --no-typescript
   cd stepup-bhubaneswar
   ```

2. **Install Dependencies**
   ```bash
   npm install lucide-react
   ```

3. **Copy the Components**
   - Copy all the component files from the artifacts into their respective directories
   - Update the configuration files (tailwind.config.js, next.config.js, etc.)

4. **Run Development Server**
   ```bash
   npm run dev
   ```

5. **Open in Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Design Philosophy

- **Clean & Modern**: Inspired by contemporary web design trends
- **Vibrant Colors**: Orange to pink gradients representing energy and movement
- **Accessible**: Proper contrast ratios and semantic markup
- **Mobile-First**: Responsive design that works beautifully on all screen sizes
- **Performance**: Optimized for fast loading and smooth interactions

## 💳 Payment Integration

The current payment system uses UPI with screenshot verification:

1. **UPI Payment**: Users pay via UPI to `stepupbhubaneswar@paytm`
2. **Screenshot Verification**: Users send payment screenshot to WhatsApp
3. **Manual Confirmation**: Admin adds users to workshop WhatsApp groups
4. **Future Enhancement**: Can be upgraded to automatic payment gateways

## 🔧 Customization

### Colors
Update brand colors in `src/app/globals.css`:
```css
:root {
  --brand-orange: #FF6B35;
  --brand-pink: #FF8FA3;  
  --brand-purple: #6B46C1;
  --brand-dark: #1F2937;
}
```

### Content
- Update workshop data in `src/components/sections/Workshops.js`
- Modify contact information in `src/components/sections/Contact.js`
- Customize the hero section in `src/components/sections/Hero.js`

### Styling
- Global styles: `src/app/globals.css`
- Tailwind config: `tailwind.config.js`
- Component-specific styles: Use Tailwind utility classes

## 📱 Features Implementation

### Workshop Management
- **Countdown Timer**: Real-time countdown to registration deadline
- **Slot Management**: Display remaining slots with color-coded urgency
- **Filter System**: Filter workshops by dance style
- **Registration Flow**: Multi-step registration with validation

### User Experience
- **Progressive Disclosure**: Information revealed step by step
- **Visual Feedback**: Loading states, hover effects, and animations
- **Mobile Optimization**: Touch-friendly interactions
- **Accessibility**: Keyboard navigation and screen reader support

## 🚀 Deployment

1. **Build for Production**
   ```bash
   npm run build
   ```

2. **Deploy Options**
   - Vercel (recommended for Next.js)
   - Netlify
   - Any hosting provider that supports Node.js

## 📞 Contact Integration

- **WhatsApp**: Direct links to WhatsApp with pre-filled messages
- **Email**: Mailto links for email communication
- **Phone**: Click-to-call functionality on mobile devices

## 🔄 Future Enhancements

1. **Automatic Payment Gateway**: Integrate Razorpay/Stripe
2. **User Dashboard**: Personal dashboard for registered users
3. **Workshop Videos**: Integration with video platforms
4. **Advanced Analytics**: User behavior tracking
5. **Multi-language Support**: Hindi and Odia language options
6. **Mobile App**: React Native mobile application

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Step Up Bhubaneswar** - Dance is for Everyone! 💃🕺