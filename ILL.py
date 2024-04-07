from datetime import datetime, timedelta
from fastapi import FastAPI, Request, APIRouter
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from starlette.middleware.sessions import SessionMiddleware
from starlette.responses import RedirectResponse
from Config.ILcConfig import Config
from Backend.Connections.ILconDBConnector import connect_to_db, create_tables
from Backend.Controllers.ILcrUserController import (register_user, login_user, register_sport, save_idea,
                                                    get_ideas, get_sports)

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


@app.get("/holiday", response_class=HTMLResponse)
async def holiday(request: Request):
    if not is_logged_in(request):
        return RedirectResponse("/", status_code=302)
    return templates.TemplateResponse("holidays.html", {"request": request})


@app.get("/timetable", response_class=HTMLResponse)
async def timetable(request: Request):
    if not is_logged_in(request):
        return RedirectResponse("/", status_code=302)
    return templates.TemplateResponse("timetable.html", {"request": request})


@app.get("/sportsform", response_class=HTMLResponse)
async def sportsform(request: Request):
    if not is_logged_in(request):
        return RedirectResponse("/", status_code=302)
    return templates.TemplateResponse("sportsform.html", {"request": request})


@app.get("/paymain", response_class=HTMLResponse)
async def paymain(request: Request):
    if not is_logged_in(request):
        return RedirectResponse("/", status_code=302)
    return templates.TemplateResponse("paymain.html", {"request": request})


@app.get("/library_updates", response_class=HTMLResponse)
async def library_updates(request: Request):
    if not is_logged_in(request):
        return RedirectResponse("/", status_code=302)
    return templates.TemplateResponse("library_updates.html", {"request": request})


@app.get("/guest_lecture", response_class=HTMLResponse)
async def guest_lecture(request: Request):
    if not is_logged_in(request):
        return RedirectResponse("/", status_code=302)
    return templates.TemplateResponse("guest_lecture.html", {"request": request})


@app.get("/ideahub", response_class=HTMLResponse)
async def ideahub(request: Request):
    if not is_logged_in(request):
        return RedirectResponse("/", status_code=302)
    return templates.TemplateResponse("ideahub.html", {"request": request})


@app.get("/yoga_wellness_sessions", response_class=HTMLResponse)
async def yoga_wellness_sessions(request: Request):
    if not is_logged_in(request):
        return RedirectResponse("/", status_code=302)
    return templates.TemplateResponse("yoga_wellness_sessions.html", {"request": request})


@app.get("/webinars_for_academic_success", response_class=HTMLResponse)
async def webinars_for_academic_success(request: Request):
    if not is_logged_in(request):
        return RedirectResponse("/", status_code=302)
    return templates.TemplateResponse("webinars_for_academic_success.html", {"request": request})


@app.get("/support", response_class=HTMLResponse)
async def support(request: Request):
    if not is_logged_in(request):
        return RedirectResponse("/", status_code=302)
    return templates.TemplateResponse("support.html", {"request": request})


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
        request.session["expires_at"] = (datetime.now() + timedelta(hours=12)).isoformat()
        print(request.session["expires_at"])
    return result


@app.post("/api/sports_register")
async def handle_sports_reg(request: Request):
    form_data = await request.form()
    std_name = form_data["name"]
    std_department = form_data["std_department"]
    sport = form_data["sport"]
    gender = form_data["gender"]
    result = register_sport(std_name=std_name, std_department=std_department, sport=sport, gender=gender)
    return result


@app.get("/api/get_sports")
async def handle_get_sports(request: Request):
    username = request.session["user_id"]
    result = get_sports(username=username)
    return result


@app.post("/api/submit_idea")
async def handle_idea_submission(request: Request):
    idea_data = await request.form()
    user_name = request.session["user_id"]
    idea = idea_data["idea"]
    submitted_on = datetime.now()
    result = save_idea(username=user_name, idea=idea, submitted_on=submitted_on)
    return result


@app.get("/api/get_ideas")
async def handle_get_ideas(request: Request):
    user_name = request.session["user_id"]
    result = get_ideas(username=user_name)
    return result


# Event Handlers
@app.on_event("shutdown")
def shutdown_event():
    db_con.close()
    print("Database connection closed.")
    print("Server shutdown.")
    print("Goodbye!")
    return {"message": "Server shutdown"}
