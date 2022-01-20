const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  googleid: String,
  colleges: [String],
  college_type: [String],
  app_deadlines: [String],
  decision_dates: [String],
  main_essays: [Boolean],
  num_supps: [Number],
  portfolio: [Boolean],
  recs: [Number],
  std_tests: [Boolean],
  submitted: [Boolean]
  
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
