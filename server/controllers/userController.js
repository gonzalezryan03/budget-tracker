/**
 * Store or retrieve user data such as name, email, password, etc.
 */

exports.getUserProfile = (req, res) => {
    const userProfile = {
        id: 1,
        name: "Test User",
        yearlyEarnings: 100000,
    };

    return res.status(200).json(userProfile);
};

exports.updateUserProfile = (req, res) => {
    const { yearlyEarnings, name } = req.body;
    return res.status(200).json({
        message: 'User profile updated successfully',
        updatedProfile: {
          name,
          yearlyEarnings
        }
    });
};