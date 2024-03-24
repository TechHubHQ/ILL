from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from starlette.middleware.sessions import SessionMiddleware
from starlette.responses import RedirectResponse
from Backend.Connections.ILconDBConnector import connect_to_db
from Config.ILcConfig import Config
from Backend.Controllers.ILcrUserController import register_user, login_user

app = FastAPI()
app.mount("/Frontend/Static", StaticFiles(directory="Frontend/Static"), name="static")

app.add_middleware(SessionMiddleware, secret_key=Config.SECRET_KEY)
templates = Jinja2Templates(directory="Frontend/pages")
db_con = connect_to_db()


# Session Handler
def is_logged_in(request: Request):
    return "user_id" in request.session


# Page Route Handlers
@app.get("/", response_class=HTMLResponse)
async def login(request: Request):
    if is_logged_in(request):
        return RedirectResponse("/home", status_code=302)
    return templates.TemplateResponse("login.html", {"request": request})


@app.get("/signup", response_class=HTMLResponse)
async def signup(request: Request):
    return templates.TemplateResponse("onboarding.html", {"request": request})


@app.get("/home", response_class=HTMLResponse)
async def home(request: Request):
    if not is_logged_in(request):
        return RedirectResponse("/", status_code=302)
    return templates.TemplateResponse("home.html", {"request": request})


@app.get("/courses", response_class=HTMLResponse)
async def courses(request: Request):
    if not is_logged_in(request):
        return RedirectResponse("/", status_code=302)
    return templates.TemplateResponse("courses.html", {"request": request})


@app.get("/assignments", response_class=HTMLResponse)
async def assignments(request: Request):
    if not is_logged_in(request):
        return RedirectResponse("/", status_code=302)
    return templates.TemplateResponse("assignments.html", {"request": request})


@app.get("/profile", response_class=HTMLResponse)
async def profile(request: Request):
    if not is_logged_in(request):
        return RedirectResponse("/", status_code=302)
    return templates.TemplateResponse("profile.html", {"request": request})


@app.get("/events", response_class=HTMLResponse)
async def events(request: Request):
    if not is_logged_in(request):
        return RedirectResponse("/", status_code=302)
    return templates.TemplateResponse("events.html", {"request": request})


@app.get("/quiz", response_class=HTMLResponse)
async def quiz(request: Request):
    if not is_logged_in(request):
        return RedirectResponse("/", status_code=302)
    return templates.TemplateResponse("quiz.html", {"request": request})


# API call Handlers
@app.post("/api/register")
async def handle_signup(request: Request):
    form_data = await request.form()
    username = form_data["full-name"]
    email = form_data["email"]
    phone = form_data["phone"]
    password = form_data["password"]
    confirm_password = form_data["confirm-password"]
    result = register_user(username=username, email=email, phone=phone, role='Student',
                           password=password, confirm_password=confirm_password)
    return result


@app.post("/api/login")
async def handle_login(request: Request):
    form_data = await request.form()
    email = form_data["email"]
    password = form_data["password"]
    result = login_user(email=email, password=password)
    if result["message"] == "Login successful":
        request.session["user_id"] = result["user_id"]
    return result


# Event Handlers
@app.on_event("shutdown")
def shutdown_event():
    db_con.close()
    print("Database connection closed.")
    print("Server shutdown.")
    print("Goodbye!")
    return {"message": "Server shutdown"}
