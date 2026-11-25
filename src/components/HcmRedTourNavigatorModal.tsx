import React, { useState } from 'react';
import { 
  X, MapPin, Navigation, Clock, Compass, Volume2, VolumeX, 
  ExternalLink, CheckCircle2, ChevronRight, Award, Footprints, Info
} from 'lucide-react';
import { RED_TOUR_THU_DAU_MOT, RedTourStop } from '../data/hcmAdvancedFeaturesData';

interface HcmRedTourNavigatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenHeritageSite?: (siteId: string) => void;
  voiceGender?: 'bac' | 'trung' | 'nam';
}

export const HcmRedTourNavigatorModal: React.FC<HcmRedTourNavigatorModalProps> = ({
  isOpen,
  onClose,
  onOpenHeritageSite,
  voiceGender = 'bac'
}) => {
  const [selectedStationIndex, setSelectedStationIndex] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [visitedStations, setVisitedStations] = useState<number[]>([0]);

  if (!isOpen) return null;

  const stations = RED_TOUR_THU_DAU_MOT;
  const currentStation = stations[selectedStationIndex];

  const handleToggleVisited = (idx: number) => {
    if (visitedStations.includes(idx)) {
      setVisitedStations(visitedStations.filter(i => i !== idx));
    } else {
      setVisitedStations([...visitedStations, idx]);
    }
  };

  const speakAudioGuide = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      if (isPlayingAudio) {
        setIsPlayingAudio(false);
        return;
      }
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = 'vi-VN';
      utter.rate = 0.92;
      const voices = window.speechSynthesis.getVoices();
      const viVoice = voices.find(v => v.lang.includes('vi'));
      if (viVoice) utter.voice = viVoice;
      utter.onend = () => setIsPlayingAudio(false);
      utter.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utter);
      setIsPlayingAudio(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl h-[92vh] flex flex-col border-2 border-[#C59A55]/50 overflow-hidden font-sans">
        
        {/* Header */}
        <div className="px-5 py-3.5 bg-gradient-to-r from-[#751D2C] via-[#8B2332] to-[#5C1420] text-white flex items-center justify-between border-b border-[#C59A55]/40 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E2B755] to-[#B3802B] p-0.5 shadow-md flex items-center justify-center text-[#751D2C]">
              <Compass className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-[#C59A55]/30 text-amber-200 text-xs rounded-full font-bold uppercase tracking-wider border border-[#C59A55]/50">
                  Hành trình Về Nguồn
                </span>
                <span className="text-xs text-amber-100/80">Cự ly: ~6.0 km • ~3.5 giờ</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-amber-100 flex items-center gap-2">
                Tuyến Du Lịch Đỏ Về Nguồn Thủ Dầu Một
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-black/25 rounded-full text-xs text-amber-200 border border-amber-500/30">
              <Footprints className="w-3.5 h-3.5" />
              <span>Tiến độ: {visitedStations.length}/{stations.length} điểm</span>
            </div>
            <button 
              onClick={() => {
                if ('speechSynthesis' in window) window.speechSynthesis.cancel();
                onClose();
              }}
              className="p-1.5 hover:bg-white/20 rounded-full text-white/90 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-slate-50">
          
          {/* Left: Station Stepper Sidebar */}
          <div className="w-full md:w-80 lg:w-96 bg-white border-r border-slate-200 flex flex-col overflow-y-auto p-3 sm:p-4 space-y-3 flex-shrink-0">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-[#751D2C] uppercase tracking-wider flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-[#C59A55]" /> 5 Trạm Dừng Liên Hoàn
              </span>
              <span className="text-[11px] text-slate-500">Bấm trạm để dẫn đường</span>
            </div>

            <div className="space-y-2">
              {stations.map((st, idx) => {
                const isSelected = selectedStationIndex === idx;
                const isVisited = visitedStations.includes(idx);
                return (
                  <div 
                    key={st.stopOrder}
                    onClick={() => setSelectedStationIndex(idx)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer relative lucian-spring-btn hover:translate-x-1 ${
                      isSelected 
                        ? 'bg-amber-50/80 border-[#C59A55] shadow-sm ring-1 ring-[#C59A55]/50' 
                        : 'bg-white border-slate-200 hover:border-amber-300 hover:bg-slate-50/60 shadow-2xs'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 transition-colors ${
                        isVisited 
                          ? 'bg-emerald-600 text-white' 
                          : isSelected 
                            ? 'bg-[#751D2C] text-amber-200' 
                            : 'bg-slate-200 text-slate-700'
                      }`}>
                        {isVisited ? '✓' : idx + 1}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-semibold text-[#8B2332] bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200/60">
                            {st.distanceFromStart}
                          </span>
                          <span className="text-[10px] text-slate-400 flex items-center gap-1">
                            <Clock className="w-2.5 h-2.5" /> {st.estimatedDuration}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-800 mt-1 line-clamp-1">
                          {st.name}
                        </h4>
                        <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                          {st.address}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Practical Tour Advice Box */}
            <div className="mt-auto p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 space-y-1.5">
              <div className="font-bold flex items-center gap-1 text-[#751D2C]">
                <Info className="w-3.5 h-3.5 text-[#C59A55]" /> Lưu ý khi tham gia tuyến đỏ:
              </div>
              <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-700">
                <li>Trang phục trang nghiêm, lịch sự khi vào Chùa Hội Khánh và Nhà truyền thống.</li>
                <li>Chuẩn bị điện thoại có kết nối mạng để quét mã QR thuyết minh hiện vật tại các điểm.</li>
              </ul>
            </div>
          </div>

          {/* Right: Station Detail Panel */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-gradient-to-b from-white to-amber-50/20">
            {/* Station Hero Card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4 sm:p-5 relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 bg-[#751D2C] text-amber-100 text-xs font-bold rounded-md">
                      Trạm số {currentStation.stopOrder} / 5
                    </span>
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-md font-medium">
                      {currentStation.estimatedDuration}
                    </span>
                    <span className="px-2 py-0.5 bg-amber-50 text-amber-900 border border-amber-200 text-xs rounded-md font-medium">
                      {currentStation.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#751D2C]">
                    {currentStation.name}
                  </h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#C59A55]" /> {currentStation.address}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => speakAudioGuide(`${currentStation.name}. ${currentStation.audioTourGuide}`)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer ${
                      isPlayingAudio 
                        ? 'bg-rose-600 text-white animate-pulse' 
                        : 'bg-amber-100 text-amber-900 hover:bg-amber-200 border border-amber-300'
                    }`}
                  >
                    {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#751D2C]" />}
                    <span>{isPlayingAudio ? 'Dừng đọc' : 'Nghe Thuyết Minh AI'}</span>
                  </button>

                  <button
                    onClick={() => handleToggleVisited(selectedStationIndex)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all border cursor-pointer ${
                      visitedStations.includes(selectedStationIndex)
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <CheckCircle2 className={`w-4 h-4 ${visitedStations.includes(selectedStationIndex) ? 'text-emerald-600' : 'text-slate-400'}`} />
                    <span>{visitedStations.includes(selectedStationIndex) ? 'Đã Check-in' : 'Đánh dấu Đã đến'}</span>
                  </button>
                </div>
              </div>

              {/* Historical Significance Callout */}
              <div className="mt-4 p-3.5 bg-gradient-to-r from-rose-50 to-amber-50 rounded-xl border border-rose-100">
                <div className="text-xs font-bold text-[#751D2C] uppercase tracking-wide flex items-center gap-1.5 mb-1">
                  <Award className="w-4 h-4 text-[#C59A55]" /> Ý Nghĩa Lịch Sử & Giá Trị Di Sản
                </div>
                <p className="text-sm font-semibold text-slate-800 leading-relaxed">
                  {currentStation.historicSignificance}
                </p>
              </div>

              {/* Connection with Uncle Ho and Revolution */}
              <div className="mt-4">
                <h4 className="text-xs font-bold text-[#8B2332] uppercase tracking-wide mb-1.5">
                  Mối liên kết với Bác Hồ và Cách mạng:
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed bg-amber-50/50 p-3.5 rounded-xl border border-amber-200/60">
                  {currentStation.heritageConnection}
                </p>
              </div>

              {/* Audio Tour Guide Text */}
              <div className="mt-4">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                  Lời dẫn Thuyết minh Audio Guide:
                </h4>
                <p className="text-xs text-slate-600 italic leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  "{currentStation.audioTourGuide}"
                </p>
              </div>

              {/* Actions & Navigation Links */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-slate-500">
                  Tọa độ GPS: <span className="font-mono text-slate-700">{currentStation.coordinates.lat.toFixed(4)}, {currentStation.coordinates.lng.toFixed(4)}</span>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${currentStation.coordinates.lat},${currentStation.coordinates.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-xs font-semibold flex items-center gap-1.5 border border-blue-200 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Mở Google Maps chỉ đường</span>
                  </a>

                  {selectedStationIndex < stations.length - 1 && (
                    <button
                      onClick={() => setSelectedStationIndex(selectedStationIndex + 1)}
                      className="px-4 py-1.5 bg-[#751D2C] hover:bg-[#8B2332] text-amber-100 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                    >
                      <span>Trạm tiếp theo</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Tour Map Overview Banner */}
            <div className="bg-gradient-to-r from-amber-900 to-[#751D2C] text-white rounded-2xl p-4 shadow-md flex items-center justify-between">
              <div>
                <h4 className="font-bold text-amber-100 text-sm">Bản đồ số Tuyến Du Lịch Đỏ</h4>
                <p className="text-xs text-amber-200/80 mt-0.5">
                  Đã kết nối trực tiếp với hệ sinh thái Bản đồ Di tích 3D phường Thủ Dầu Một.
                </p>
              </div>
              <button 
                onClick={() => {
                  onClose();
                  if (onOpenHeritageSite) onOpenHeritageSite('chua-hoi-khanh');
                }}
                className="px-3.5 py-1.5 bg-[#C59A55] hover:bg-[#D4A96A] text-slate-900 font-bold text-xs rounded-xl transition-all shadow cursor-pointer"
              >
                Xem Bản Đồ 3D
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
