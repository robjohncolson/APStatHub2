# AP Statistics Knowledge Tree 3D Visualization v2.0.0: "StatGlide"

## Release Notes

We're thrilled to announce the release of version 2.0.0 of the AP Statistics Knowledge Tree 3D Visualization, codenamed "StatGlide." This major update transforms the way users navigate through the knowledge tree with smooth, precise controls and significant improvements to the overall experience.

### 🌟 Key Features

- **Multi-tiered Movement Precision**:
  - **Standard Movement**: Full-speed navigation for quick traversal of the knowledge tree
  - **Fine Control Mode**: Hold Shift for 1/5 speed, perfect for more deliberate positioning
  - **Super Fine Control Mode**: Hold Ctrl+Shift for 1/25 speed, enabling pixel-perfect precision

- **Comprehensive Keyboard Navigation**:
  - Fixed non-responsive arrow key controls for intuitive directional panning
  - WASD keys for forward/backward and lateral movement
  - QE keys for vertical movement
  - +/- keys for zooming in and out
  - All movement controls support the new precision modifiers

- **Custom Panning Solution**: Implemented a robust fallback mechanism that ensures consistent panning functionality even when OrbitControls.pan is unavailable

- **Enhanced Visual Feedback**: Improved console logging provides clear information about the current control mode and movement vectors

### 🛠️ Technical Improvements

- **Increased Default Movement Speed**: Raised the base PAN_SPEED from 20 to 50 for more noticeable movement
- **Synchronized Camera Movement**: Enhanced the custom pan function to maintain proper view direction by moving both camera position and target
- **Consistent Control Experience**: Unified the movement speed calculations across all navigation methods
- **Improved Debugging Tools**: Added detailed logging of key presses, control states, and movement vectors

### 📚 User Interface Enhancements

- **Updated Help Panel**: Comprehensive on-screen keyboard control reference with all new movement options
- **Improved Status Notifications**: Clear visual feedback when toggling keyboard controls
- **Preserved View Direction**: Maintained consistent view orientation during all movement operations

### 🐛 Bug Fixes

- **Arrow Key Functionality**: Resolved the core issue where arrow keys had no effect on the visualization
- **Camera-Control Synchronization**: Fixed inconsistencies between camera position and control target during movement
- **Event Handling**: Improved event.preventDefault() implementation to prevent unwanted browser actions during navigation

### 💡 Implementation Details

- Added detection for both Shift and Ctrl+Shift key combinations
- Implemented a unified speed multiplier approach for cleaner code
- Created a custom vector-based panning solution as a fallback
- Enhanced the keyboard event handling system

---

This release represents a significant leap forward from v1.0.0, addressing the core navigation issues while adding powerful new precision controls. The StatGlide update makes exploring the AP Statistics Knowledge Tree more intuitive, precise, and enjoyable for students and educators alike.

Thank you to all users who provided valuable feedback that helped shape this release!
