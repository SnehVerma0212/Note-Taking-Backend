const Note = require("./../models/Note.model");

const createNote = async (req,res) => {
    try{
        const user = req.user._id;
        const { title, notes, importance } = req.body;
        
        if(!user){ 
            return res.status(400).json({
                msg: "You are not logged in."
            })
        }
        if(!title || !notes){
            return res.status(400).json({
                msg: "Please fill alll the required fields."
            })
        }

        const exists = await Note.findOne({ user, title });
        if(exists){
            return res.status(400).json({
                msg: "A note with the same title already exists."
            })
        }

        const validLevels = ["high", "medium", "low"];
        if (importance && !validLevels.includes(importance.toLowerCase())) {
            return res.status(400).json({
                msg: "Importance must be one of: high, medium, or low."
            });
        }

        const newNote = new Note({
            user: user,
            title: title,
            notes: notes,
            importance: importance.toLowerCase()
        })

        await newNote.save();

        res.status(200).json({
            msg: "Note created successfully."
        })
    }catch(err){
        console.log(err.message);
        return res.status(500).json({
            msg: "Internal server error."
        })
    }
}

const getNotes = async (req,res) => {
    try{
        const user = req.user._id;
        const { title, sort, level } = req.query;

        if(title){
            const note = await Note.findOne({user: user, title: title});
            if(!note){
                return res.status(404).json({
                    msg: "Note not found"
                })
            }
            return res.status(200).json({note})
        }
        const query = {user:user};
        if(level){
            query.importance = level.toLowerCase();
        }
        let sortQuery = {createdAt: -1};
        if(sort === 'importance'){
            sortQuery = { importance: -1 , createdAt: -1 };
        }

        const notes = await Note.find(query).select('title').sort(sortQuery);

        const noteTitles = notes.map( note => note.title );

        res.status(200).json({
            notes: noteTitles
        })
    }catch(err){
        console.log(err.message);
        return res.status(500).json({
            msg: "Internal server error."
        })
    }
}

const updateNote = async (req,res) => {
    try{    
        const user = req.user._id;
        const noteId = req.params.id;

        const { title , notes , importance } = req.body;
        
        const note = await Note.findOne({_id: noteId, user: user});
        if(!note){
            return res.status(404).json({
                msg: "Note not found."
            })
        }

        if(title) note.title = title;
        if(notes) note.notes = notes;
        if (importance) {
            const validLevels = ["high", "medium", "low"];
            if (!validLevels.includes(importance.toLowerCase())) {
                return res.status(400).json({
                    msg: "Importance must be one of: high, medium, low."
                });
            }
            note.importance = importance.toLowerCase();
        }

        await note.save();

        res.status(200).json({
            msg: "Note updated successfully",
            note
        })
    }catch(err){
        console.log(err.message);
        return res.status(500).json({
            msg: "Internal server error."
        })
    }
}

const deleteNote = async (req,res) => {
    try{
        const user = req.user._id;
        const noteId = req.params.id;

        if(!user) return res.status(404).json({msg: "You are not logged in."});
        
        const deletedNote = await Note.findOneAndDelete({_id: noteId, user: user});

        if(!deletedNote){
            return res.status(404).json({
                msg: "Note not found."
            })
        }

        res.status(200).json({
            msg: "Note deleted successfully.",
            deletedNote
        })
    }catch(err){
        console.log(err.message);
        return res.status(500).json({
            msg: "Internal server error."
        })
    }
}


module.exports = {
    createNote,
    getNotes,
    updateNote,
    deleteNote
}