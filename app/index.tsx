import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Alert,
  Dimensions,
} from 'react-native';
import { Heart, MessageCircle, Send, Bookmark, Plus, Home, User, Eye, EyeOff, LogOut, MoreHorizontal } from 'lucide-react-native';

const { width } = Dimensions.get('window');

// Types
interface Post {
  id: number;
  username: string;
  avatar: string;
  image: string;
  likes: number;
  caption: string;
  time: string;
}

interface UserType {
  id: string;
  username: string;
  email: string;
  password: string;
  fullName: string;
  avatar: string;
  posts: number;
  followers: number;
  following: number;
  bio: string;
  myPosts: string[];
  createdAt: string;
}

interface AuthResult {
  success: boolean;
  user?: UserType;
  error?: string;
}

// Mock data
const mockPosts: Post[] = [
  {
    id: 1,
    username: 'sarah_wanderlust',
    avatar: 'https://i.pravatar.cc/150?img=1',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    likes: 1234,
    caption: 'Lost in the mountains 🏔️',
    time: '2h ago',
  },
  {
    id: 2,
    username: 'alex_photography',
    avatar: 'https://i.pravatar.cc/150?img=2',
    image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=800',
    likes: 856,
    caption: 'Golden hour magic ✨',
    time: '5h ago',
  },
  {
    id: 3,
    username: 'foodie_dreams',
    avatar: 'https://i.pravatar.cc/150?img=3',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800',
    likes: 2341,
    caption: 'Best burger in town! 🍔',
    time: '8h ago',
  },
];

// Authentication Storage System
class AuthStorageClass {
  private users: UserType[] = [];
  private currentUser: UserType | null = null;

  init(): void {
    this.users = [];
    this.currentUser = null;
  }

  register(username: string, email: string, password: string, fullName: string): AuthResult {
    const existingUser = this.users.find(u => u.username === username || u.email === email);
    if (existingUser) {
      return { success: false, error: 'Username or email already exists' };
    }

    const newUser: UserType = {
      id: Date.now().toString(),
      username,
      email,
      password,
      fullName,
      avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
      posts: 0,
      followers: 0,
      following: 0,
      bio: '',
      myPosts: [],
      createdAt: new Date().toISOString(),
    };

    this.users.push(newUser);
    return { success: true, user: newUser };
  }

  login(usernameOrEmail: string, password: string): AuthResult {
    const user = this.users.find(
      u => (u.username === usernameOrEmail || u.email === usernameOrEmail) && u.password === password
    );

    if (user) {
      this.currentUser = user;
      return { success: true, user };
    }
    return { success: false, error: 'Invalid credentials' };
  }

  logout(): void {
    this.currentUser = null;
  }

  getCurrentUser(): UserType | null {
    return this.currentUser;
  }
}

const AuthStorage = new AuthStorageClass();
AuthStorage.init();

// Components
interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [liked, setLiked] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);

  return (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <View style={styles.postHeaderLeft}>
          <Image source={{ uri: post.avatar }} style={styles.postAvatar} />
          <Text style={styles.postUsername}>{post.username}</Text>
        </View>
        <TouchableOpacity>
          <MoreHorizontal size={20} color="#000" />
        </TouchableOpacity>
      </View>

      <Image source={{ uri: post.image }} style={styles.postImage} />

      <View style={styles.postActions}>
        <View style={styles.postActionsLeft}>
          <TouchableOpacity onPress={() => setLiked(!liked)}>
            <Heart size={28} color={liked ? '#9333ea' : '#333'} fill={liked ? '#9333ea' : 'none'} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <MessageCircle size={28} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Send size={28} color="#333" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => setSaved(!saved)}>
          <Bookmark size={28} color={saved ? '#9333ea' : '#333'} fill={saved ? '#9333ea' : 'none'} />
        </TouchableOpacity>
      </View>

      <View style={styles.postInfo}>
        <Text style={styles.likesText}>{post.likes.toLocaleString()} likes</Text>
        <Text style={styles.caption}>
          <Text style={styles.captionUsername}>{post.username}</Text> {post.caption}
        </Text>
        <Text style={styles.timeText}>{post.time}</Text>
      </View>
    </View>
  );
};

const HomeScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>Framez</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.headerButton}>
            <Heart size={28} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <MessageCircle size={28} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        {mockPosts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const AddPostScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centerContent}>
        <View style={styles.addPostIcon}>
          <Plus size={64} color="#9333ea" />
        </View>
        <Text style={styles.addPostTitle}>Create New Post</Text>
        <Text style={styles.addPostText}>Tap to select a photo</Text>
      </View>
    </SafeAreaView>
  );
};

interface ProfileScreenProps {
  onLogout: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ onLogout }) => {
  const currentUser = AuthStorage.getCurrentUser();

  if (!currentUser) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileHeader}>
        <Text style={styles.profileUsername}>{currentUser.username}</Text>
        <TouchableOpacity onPress={onLogout} style={styles.logoutButton}>
          <LogOut size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View style={styles.profileTop}>
          <Image source={{ uri: currentUser.avatar }} style={styles.profileAvatar} />
          <View style={styles.profileStats}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{currentUser.posts}</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{currentUser.followers}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{currentUser.following}</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
          </View>
        </View>

        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{currentUser.fullName}</Text>
          <Text style={styles.profileBio}>{currentUser.bio || 'No bio yet'}</Text>
        </View>

        <TouchableOpacity style={styles.editProfileButton}>
          <Text style={styles.editProfileText}>Edit Profile</Text>
        </TouchableOpacity>

        <View style={styles.profileGrid}>
          {currentUser.myPosts.length === 0 ? (
            <View style={styles.noPostsContainer}>
              <Text style={styles.noPostsText}>No posts yet</Text>
            </View>
          ) : (
            currentUser.myPosts.map((img, idx) => (
              <Image key={idx} source={{ uri: img }} style={styles.gridImage} />
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

interface LoginScreenProps {
  onLogin: (user: UserType) => void;
  onSwitchToSignup: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onSwitchToSignup }) => {
  const [usernameOrEmail, setUsernameOrEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = (): void => {
    if (!usernameOrEmail || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const result = AuthStorage.login(usernameOrEmail, password);
      setLoading(false);

      if (result.success && result.user) {
        onLogin(result.user);
      } else {
        Alert.alert('Login Failed', result.error || 'Login failed');
      }
    }, 500);
  };

  return (
    <SafeAreaView style={styles.authContainer}>
      <View style={styles.authContent}>
        <Text style={styles.authLogo}>Framez</Text>
        <Text style={styles.authSubtitle}>Welcome back!</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Username or Email"
            value={usernameOrEmail}
            onChangeText={setUsernameOrEmail}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeOff size={20} color="#999" /> : <Eye size={20} color="#999" />}
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.authButton, loading && styles.authButtonDisabled]}
          onPress={handleLogin}
          disabled={loading}>
          <Text style={styles.authButtonText}>{loading ? 'Logging in...' : 'Log In'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.switchAuthButton} onPress={onSwitchToSignup}>
          <Text style={styles.switchAuthText}>
            Don't have an account? <Text style={styles.switchAuthLink}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

interface SignupScreenProps {
  onSignup: (user: UserType) => void;
  onSwitchToLogin: () => void;
}

const SignupScreen: React.FC<SignupScreenProps> = ({ onSignup, onSwitchToLogin }) => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignup = (): void => {
    if (!username || !email || !fullName || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const result = AuthStorage.register(username, email, password, fullName);
      setLoading(false);

      if (result.success && result.user) {
        const loginResult = AuthStorage.login(username, password);
        if (loginResult.success && loginResult.user) {
          Alert.alert('Success', 'Account created successfully!');
          onSignup(loginResult.user);
        }
      } else {
        Alert.alert('Signup Failed', result.error || 'Signup failed');
      }
    }, 500);
  };

  return (
    <SafeAreaView style={styles.authContainer}>
      <ScrollView contentContainerStyle={styles.authScrollContent}>
        <View style={styles.authContent}>
          <Text style={styles.authLogo}>Framez</Text>
          <Text style={styles.authSubtitle}>Create your account</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={fullName}
              onChangeText={setFullName}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              autoCorrect={false}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={20} color="#999" /> : <Eye size={20} color="#999" />}
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
          </View>

          <TouchableOpacity
            style={[styles.authButton, loading && styles.authButtonDisabled]}
            onPress={handleSignup}
            disabled={loading}>
            <Text style={styles.authButtonText}>{loading ? 'Creating Account...' : 'Sign Up'}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.switchAuthButton} onPress={onSwitchToLogin}>
            <Text style={styles.switchAuthText}>
              Already have an account? <Text style={styles.switchAuthLink}>Log In</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

type TabType = 'home' | 'add' | 'profile';
type AuthScreenType = 'login' | 'signup';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authScreen, setAuthScreen] = useState<AuthScreenType>('login');

  useEffect(() => {
    const currentUser = AuthStorage.getCurrentUser();
    if (currentUser) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (user: UserType): void => {
    setIsAuthenticated(true);
  };

  const handleSignup = (user: UserType): void => {
    setIsAuthenticated(true);
  };

  const handleLogout = (): void => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        onPress: () => {
          AuthStorage.logout();
          setIsAuthenticated(false);
          setActiveTab('home');
        },
      },
    ]);
  };

  if (!isAuthenticated) {
    return authScreen === 'login' ? (
      <LoginScreen onLogin={handleLogin} onSwitchToSignup={() => setAuthScreen('signup')} />
    ) : (
      <SignupScreen onSignup={handleSignup} onSwitchToLogin={() => setAuthScreen('login')} />
    );
  }

  const renderScreen = (): JSX.Element => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen />;
      case 'add':
        return <AddPostScreen />;
      case 'profile':
        return <ProfileScreen onLogout={handleLogout} />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <View style={styles.app}>
      {renderScreen()}

      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => setActiveTab('home')}>
          <Home size={28} color={activeTab === 'home' ? '#9333ea' : '#666'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('add')}>
          <Plus size={28} color={activeTab === 'add' ? '#9333ea' : '#666'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('profile')}>
          <User size={28} color={activeTab === 'profile' ? '#9333ea' : '#666'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  logo: {
    fontSize: 28,
    fontWeight: '600',
    color: '#9333ea',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 16,
  },
  headerButton: {
    padding: 4,
  },
  postCard: {
    backgroundColor: 'white',
    marginBottom: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e5e5e5',
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  postHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  postAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  postUsername: {
    fontWeight: '600',
    fontSize: 14,
  },
  postImage: {
    width: '100%',
    aspectRatio: 1,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
  },
  postActionsLeft: {
    flexDirection: 'row',
    gap: 16,
  },
  actionButton: {
    marginLeft: 0,
  },
  postInfo: {
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  likesText: {
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 8,
  },
  caption: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  captionUsername: {
    fontWeight: '600',
  },
  timeText: {
    fontSize: 12,
    color: '#999',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  addPostIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f3e8ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  addPostTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
  addPostText: {
    fontSize: 16,
    color: '#999',
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  profileUsername: {
    fontSize: 20,
    fontWeight: '600',
  },
  logoutButton: {
    padding: 8,
  },
  profileTop: {
    flexDirection: 'row',
    padding: 20,
    gap: 24,
    backgroundColor: 'white',
  },
  profileAvatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  profileStats: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '600',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  profileInfo: {
    padding: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  profileName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  profileBio: {
    fontSize: 14,
    lineHeight: 20,
  },
  editProfileButton: {
    margin: 12,
    padding: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: 8,
    alignItems: 'center',
  },
  editProfileText: {
    fontSize: 14,
    fontWeight: '600',
  },
  profileGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    minHeight: 200,
  },
  gridImage: {
    width: width / 3,
    height: width / 3,
    borderWidth: 1,
    borderColor: 'white',
  },
  noPostsContainer: {
    width: '100%',
    padding: 40,
    alignItems: 'center',
  },
  noPostsText: {
    fontSize: 16,
    color: '#999',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
    paddingVertical: 12,
  },
  // Auth Styles
  authContainer: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  authScrollContent: {
    flexGrow: 1,
  },
  authContent: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    maxWidth: 400,
    width: '100%',
    alignSelf: 'center',
  },
  authLogo: {
    fontSize: 48,
    fontWeight: '700',
    color: '#9333ea',
    textAlign: 'center',
    marginBottom: 8,
  },
  authSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 16,
    position: 'relative',
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
  },
  eyeIcon: {
    position: 'absolute',
    right: 14,
    top: 14,
  },
  authButton: {
    backgroundColor: '#9333ea',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  authButtonDisabled: {
    opacity: 0.6,
  },
  authButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  switchAuthButton: {
    padding: 8,
    alignItems: 'center',
  },
  switchAuthText: {
    fontSize: 14,
    color: '#666',
  },
  switchAuthLink: {
    color: '#9333ea',
    fontWeight: '600',
  },
});

export default App;