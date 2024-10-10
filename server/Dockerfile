FROM node:18-bullseye

RUN apt-get update && apt-get install -y \
    python3-pip \
    python3-yaml \
    python3-jinja2 \
    python3-ply \
    git \
    libboost-log-dev \
    libboost-system-dev \
    libboost-thread-dev \
    libgnutls28-dev \
    libssl-dev \
    openssl \
    libtiff-dev \
    pybind11-dev \
    qtbase5-dev \
    libqt5core5a \
    libqt5widgets5 \
    meson \
    cmake \
    ninja-build \
    pkg-config \
    libglib2.0-dev \
    libgstreamer1.0-dev \
    libgstreamer-plugins-base1.0-dev \
    libyaml-dev \
    libevent-dev \
    libdrm-dev \
    libjpeg-dev \
    libsdl2-dev \
    libexif-dev \
    libpython3-dev \
    && apt-get remove -y meson \
    && pip install --upgrade pip --root-user-action=ignore \
    && pip install --no-cache-dir 'meson>=0.63' pyyaml jinja2 ply --root-user-action=ignore \
    && rm -rf /var/lib/apt/lists/*

RUN git clone https://github.com/raspberrypi/libcamera.git /opt/libcamera

WORKDIR /opt/libcamera

RUN ln -s /usr/local/bin/meson /usr/bin/meson

# Build and install libcamera
RUN meson setup build --buildtype=release -Dpipelines=rpi/vc4,rpi/pisp \
    -Dipas=rpi/vc4,rpi/pisp -Dv4l2=true -Dgstreamer=enabled \
    -Dtest=false -Dlc-compliance=disabled -Dcam=disabled \
    -Dqcam=disabled -Ddocumentation=disabled -Dpycamera=enabled && \
    ninja -C build -j1 && \
    ninja -C build install

RUN rm -rf /opt/libcamera
    
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

CMD ["npm", "start"]