import { type } from '@testing-library/user-event/dist/type';
import mongoose from 'mongoose';
const { Schema } = mongoose;
const mongoose =require('mongooes');

const NotesSchema = new Schema({
    tittle: {
      type: String,
      required : true
    },
    description: {
      type: String,
      required : true,
    
    },
    tag: {
      type: String,
        default: 'general'
    },
    date: {
      type: String,
      default : Date.now
    },

  });

  module.exports = mongoose.model('Notes',NotesSchema);