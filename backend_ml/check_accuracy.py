import onnx

model = onnx.load("models/TESS_Model.onnx")
for prop in model.metadata_props:
    print(prop.key, prop.value)