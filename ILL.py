from datetime import datetime, timedelta
from fastapi import FastAPI, Request, APIRouter
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from starlette.middleware.sessions import SessionMiddleware
from starlette.responses import RedirectResponse
from Config.ILcConfig import Config
from Backend.Connections.ILconDBConnector import connect_to_db, create_tables
from Backend.Controllers.ILcrUserController import register_user, login_user

app = FastAPI()
router = APIRouter()
app.mount("/Frontend/Static", StaticFiles(directory="Frontend/Static"), name="static")
app.include_router(router, prefix="/api")

app.add_middleware(SessionMiddleware, secret_key=Config.SECRET_KEY)
templates = Jinja2Templates(directory="Frontend/pages")
db_con = connect_to_db()

if db_con:
    create_tables()


# Session Handler
def is_logged_in(request: Request):
    check_session(request)
    return "user_id" in request.session


def check_session(request: Request):
    if "user_id" in request.session:
        expires_at_str = request.session.get("expires_at")
        if expires_at_str:
            expires_at = datetime.fromisoformat(expires_at_str)
            if datetime.now() > expires_at:
                del request.session["user_id"]
                return RedirectResponse("/", status_code=302)
    return None


# Page Route Handlers
@app.get("/", response_class=HTMLResponse)
async def login(request: Request):
    if is_logged_in(request):
        return RedirectResponse("/landing", status_code=302)
    return templates.TemplateResponse("login.html", {"request": request})


@app.get("/signup", response_class=HTMLResponse)
async def signup(request: Request):
    return templates.TemplateResponse("onboarding.html", {"request": request})


@app.get("/home", response_class=HTMLResponse)
async def home(request: Request):
    if not is_logged_in(request):
        return RedirectResponse("/", status_code=302)
    return templates.TemplateResponse("home.html", {"request": request})


@app.get("/landing", response_class=HTMLResponse)
async def landing(request: Request):
    if not is_logged_in(request):
        return RedirectResponse("/", status_code=302)
    return templates.TemplateResponse("landing.html", {"request": request})


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
    print(form_data)
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
        print(request.session["user_id"])
        request.session["expires_at"] = (datetime.now() + timedelta(hours=12)).isoformat()
    return result


# Event Handlers
@app.on_event("shutdown")
def shutdown_event():
    db_con.close()
    print("Database connection closed.")
    print("Server shutdown.")
    print("Goodbye!")
    return {"message": "Server shutdown"}
