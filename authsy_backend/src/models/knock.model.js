const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const knockSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.ObjectId,
      required: true,
      trim: true,
    },
    IPAddress: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!value.match(/\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}\b/)) {
          throw new Error('Invalid IP');
        }
      },
    },
    port: {
      type: Number,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
knockSchema.plugin(toJSON);
knockSchema.plugin(paginate);

/**
 * Check if IP exist
 * @param {string} IPAddress - The ip address
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
knockSchema.statics.isIPAdded = async function (IPAddress, userId) {
  const userIP = await this.findOne({ IPAddress, userId: { $ne: userId } });
  return !!userIP;
};

/**
 * @typedef Knock
 */
const Knock = mongoose.model('Knock', knockSchema);

module.exports = Knock;
