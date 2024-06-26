
import mongoose from 'mongoose';

const sessionSchema = new mongoose. Schema(
  {
    userId: { type: mongoose.Schema.ObjectId, require: true, unique: true },
    accessToken: { type: String, require: true },
    refreshToken: { type: String, require: true },
    accessTokenValidUntil: { type: Date, require: true },
    refreshTokenValidUntil: { type: Date, require: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Session = mongoose. model('sessions', sessionSchema);