from deepface import DeepFace
import os

STAFF_FACES_DIR = 'staff_faces'

def recognize_face_with_deepface(img_path):
    for role in os.listdir(STAFF_FACES_DIR):
        role_path = os.path.join(STAFF_FACES_DIR, role)

        if os.path.isdir(role_path):
            try:
                result = DeepFace.find(
                    img_path= img_path,
                    db_path=role_path,
                    model_name='VGG-Face',
                    enforce_detection=False
                )
                if len(result) > 0 and len(result[0] > 0):
                    distance = result[0].iloc[0]['VGG-Face_cosine']
                    if distance < 0.3:
                        accuracy = round((1-distance) * 100,2)
                        return role, accuracy
            except Exception as e:
                print(f"Error while recognizing role:{role}:{e}")
            
    return None, 0.0